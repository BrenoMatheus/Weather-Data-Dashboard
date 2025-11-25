package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
	"github.com/joho/godotenv"
)

type WeatherMessage map[string]interface{}

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func connectRabbit(url string) (*amqp.Connection, *amqp.Channel) {
	for {
		conn, err := amqp.Dial(url)
		if err != nil {
			log.Println("RabbitMQ indisponível, tentando novamente em 5s...")
			time.Sleep(5 * time.Second)
			continue
		}

		ch, err := conn.Channel()
		if err != nil {
			log.Println("Erro no canal RabbitMQ, tentando novamente...")
			conn.Close()
			time.Sleep(5 * time.Second)
			continue
		}

		_, err = ch.QueueDeclare("weather_queue", false, false, false, false, nil)
		if err != nil {
			log.Println("Erro ao declarar fila, retry...")
			ch.Close()
			conn.Close()
			time.Sleep(5 * time.Second)
			continue
		}

		return conn, ch
	}
}

func main() {
	godotenv.Load()

	rabbitURL := os.Getenv("RABBIT_URL")
	nestURL := os.Getenv("NEST_API_URL")
	apiKey := os.Getenv("INTERNAL_API_KEY")

	if rabbitURL == "" || nestURL == "" || apiKey == "" {
		log.Fatal("Erro: variáveis RABBIT_URL, NEST_API_URL e INTERNAL_API_KEY são obrigatórias")
	}

	conn, ch := connectRabbit(rabbitURL)
	defer conn.Close()
	defer ch.Close()

	msgs, err := ch.Consume("weather_queue", "", true, false, false, false, nil)
	failOnError(err, "Erro ao iniciar consumo")

	client := &http.Client{Timeout: 10 * time.Second}

	log.Println("Worker Go rodando e aguardando mensagens...")

	for msg := range msgs {
		var data WeatherMessage
		if err := json.Unmarshal(msg.Body, &data); err != nil {
			log.Println("Erro ao decodificar JSON:", err)
			continue
		}

		body, _ := json.Marshal(data)

		// Enviar para API com retry
		for i := 1; i <= 3; i++ {
			req, err := http.NewRequest("POST", nestURL, bytes.NewBuffer(body))
			if err != nil {
				log.Println("Erro ao criar request:", err)
				continue
			}

			// 🔥 Aqui aplicamos a API Key
			req.Header.Set("Content-Type", "application/json")
			req.Header.Set("x-api-key", apiKey)

			resp, err := client.Do(req)

			if err == nil && resp.StatusCode < 300 {
				log.Println("✔ Dados enviados com sucesso ao Nest API!")
				break
			}

			if resp != nil {
				log.Printf("Falha ao enviar (status %d), tentativa %d\n", resp.StatusCode, i)
			} else {
				log.Printf("Erro ao enviar (tentativa %d): %v\n", i, err)
			}

			time.Sleep(3 * time.Second)
		}
	}
}
