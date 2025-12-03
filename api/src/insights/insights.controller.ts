import { Body, Controller, Post } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { GenerateInsightDto } from './dto/generate-insight.dto';

@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Post()
  async generate(@Body() body: GenerateInsightDto) {
    const insight = await this.insightsService.generateInsight(body.data);
    return { insight };
  }
}
