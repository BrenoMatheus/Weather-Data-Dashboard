// src/weather/schemas/weather.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema({ timestamps: true })
export class Weather {
  @Prop({ type: Object, required: true })
  raw: any;

  @Prop({ type: Number, required: false })
  temperature?: number;

  @Prop({ type: Number, required: false })
  windspeed?: number;

  @Prop({ type: String, required: false })
  timestamp?: string;

  @Prop({ type: Object, required: false })
  meta?: Record<string, any>;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
