import { IsString } from 'class-validator';

export class GenerateInsightDto {
  @IsString()
  data: string;
}
