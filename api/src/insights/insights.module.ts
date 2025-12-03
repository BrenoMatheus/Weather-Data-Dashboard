import { Module } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { InsightsController } from './insights.controller';
import { GroqModule } from '../groq/groq.module';

@Module({
  imports: [GroqModule],
  controllers: [InsightsController],
  providers: [InsightsService],
})
export class InsightsModule {}
