// src/weather/dto/create-weather.dto.ts
import { IsOptional, IsObject, IsNumber, IsString } from 'class-validator';

export class CreateWeatherDto {
  /**
   * Campo raw opcional (se o worker já enviar { raw: {...} })
   */
  @IsOptional()
  @IsObject()
  raw?: any;

  /**
   * Campos normalizados (opcionais) — preenchidos automaticamente quando presente
   */
  @IsOptional()
  @IsNumber()
  temperature?: number;

  @IsOptional()
  @IsNumber()
  windspeed?: number;

  @IsOptional()
  @IsString()
  timestamp?: string;

  /**
   * Permite enviar qualquer objeto adicional
   */
  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}
