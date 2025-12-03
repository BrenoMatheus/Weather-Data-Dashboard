import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class GroqService {
  private client: Groq;

  constructor() {
    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

async generateChatCompletion(prompt: string) {
  const response = await this.client.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { 
        role: "user",
        content: `
          Gere um insight curto e objetivo **SEM explicações**.
          Retorne SOMENTE um JSON válido, sem markdown, sem texto adicional.

          Formato:
          {
            "title": "string",
            "summary": "string",
            "opportunity": "string",
            "action": "string"
          }

          Dados:
          ${prompt}
        `,
      },
    ],
    temperature: 0.4
  });

  const content = response.choices[0].message.content;


  if (!content) {
    throw new Error("Resposta vazia do modelo");
  }

  try {

    return JSON.parse(content);
  } catch {
    console.error("Erro ao fazer parse do JSON:", content);
    throw new Error("O modelo retornou um JSON inválido");
  }
}

}
