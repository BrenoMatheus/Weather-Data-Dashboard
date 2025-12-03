import { Injectable } from '@nestjs/common';
import { GroqService } from '../groq/groq.service';

@Injectable()
export class InsightsService {
  constructor(private readonly groq: GroqService) {}

  async generateInsight(data: string) {
    const prompt = `
    Você é um assistente analítico. Gere um insight curto e útil baseado nos dados:

    ${data}

    Responda estruturado:
    - Insight principal
    - Oportunidade
    - Ação recomendada
    `;

    return await this.groq.generateChatCompletion(prompt);
  }
}
