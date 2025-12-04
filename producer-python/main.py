import os
import time
import json
import requests
import pika
from dotenv import load_dotenv

load_dotenv()

RABBIT_URL = os.getenv("RABBIT_URL")
LAT = os.getenv("LOCATION_LAT")
LON = os.getenv("LOCATION_LON")
POLL = int(os.getenv("POLL_INTERVAL_SECONDS"))
METEO_URL = os.getenv("OPENMETEO_URL")

def connect_rabbit():
    params = pika.URLParameters(RABBIT_URL)
    conn = pika.BlockingConnection(params)
    channel = conn.channel()
    channel.queue_declare(queue="weather_queue")
    return conn, channel

def fetch_weather():
    url = f"{METEO_URL}?latitude={LAT}&longitude={LON}&current_weather=true"
    r = requests.get(url)
    raw = r.json()

    # 🔥 Limpeza — só enviar o que realmente é utilizado pelo frontend
    cleaned = {
        "temperature": raw["current_weather"]["temperature"],
        "windspeed": raw["current_weather"]["windspeed"],
        "winddirection": raw["current_weather"]["winddirection"],
        "weathercode": raw["current_weather"]["weathercode"],
        "is_day": raw["current_weather"]["is_day"],
        "time": raw["current_weather"]["time"],

        # Localização (mínima)
        "latitude": raw["latitude"],
        "longitude": raw["longitude"]
    }

    return cleaned

def main():
    conn, channel = connect_rabbit()
    print("Producer iniciado.")

    while True:
        data = fetch_weather()
        msg = json.dumps(data)

        channel.basic_publish(
            exchange="",
            routing_key="weather_queue",
            body=msg
        )

        print("Enviado (limpo):", msg)
        time.sleep(POLL)

if __name__ == "__main__":
    main()
