// src/weather/weather.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather, WeatherDocument } from './weather.schema';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { PipelineStage } from 'mongoose';
import { Parser as CsvParser } from "json2csv";
import * as ExcelJS from "exceljs";


@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    @InjectModel(Weather.name)
    private readonly weatherModel: Model<WeatherDocument>,
  ) {}
  
  /**
   * Save incoming payload.
   * If CreateWeatherDto contains normalized fields, persist them too.
   * If raw is not present, we store the whole payload as raw.
   */
  async create(payload: CreateWeatherDto | any) {
    // If caller passed { raw: ... } use that, else use payload itself.
    const raw = payload?.raw ?? payload;

    // Try to extract normalized fields from the raw payload when possible
    const normalized: Partial<Pick<Weather, 'temperature' | 'windspeed' | 'timestamp' | 'meta'>> = {};

    try {
      // Common Open-Meteo shape: raw.current_weather.temperature, winds pe etc.
      if (raw?.current_weather?.temperature !== undefined) {
        normalized.temperature = Number(raw.current_weather.temperature);
      }
      if (raw?.current_weather?.windspeed !== undefined) {
        normalized.windspeed = Number(raw.current_weather.windspeed);
      }
      // Use explicit timestamp fields if present
      if (raw?.current_weather?.time) {
        normalized.timestamp = String(raw.current_weather.time);
      } else if (raw?.time) {
        normalized.timestamp = String(raw.time);
      }

      // attach some metadata if exists
      normalized.meta = raw?.metadata ?? raw?.meta ?? null;
    } catch (e) {
      // ignore extraction errors, but log
      this.logger.debug('Não foi possível extrair campos normalizados: ' + e);
    }

    const doc = await this.weatherModel.create({
      raw,
      temperature: normalized.temperature,
      windspeed: normalized.windspeed,
      timestamp: normalized.timestamp,
      meta: normalized.meta,
    });

    this.logger.log(`Weather saved (id=${doc._id})`);
    return doc;
  }

  async findAll(limit = 100, skip = 0) {
    return this.weatherModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    return this.weatherModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.weatherModel.findByIdAndDelete(id).exec();
  }

  async clear() {
    return this.weatherModel.deleteMany({}).exec();
  }

  /**
   * Basic aggregate example (average temperature over N records)
   */
  async avgTemperature(limit = 100) {
    const pipeline: PipelineStage[] = [
      { $sort: { createdAt: -1 } },
      { $limit: limit },
      { $match: { temperature: { $exists: true } } },
      {
        $group: {
          _id: null,
          avg: { $avg: '$temperature' },
        },
      },
    ];

    const res = await this.weatherModel.aggregate(pipeline).exec();
    return res?.[0]?.avg ?? null;
  }

   async exportCsv() {
    const data = await this.weatherModel.find().lean();

    const parser = new CsvParser();
    const csv = parser.parse(data);

    return Buffer.from(csv, "utf-8");
  }

  async exportXlsx() {
    const data = await this.weatherModel.find().lean();

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Weather");

    // Add header
    sheet.columns = [
      { header: "_id", key: "_id", width: 30 },
      { header: "temperature", key: "temperature", width: 15 },
      { header: "windspeed", key: "windspeed", width: 15 },
      { header: "timestamp", key: "timestamp", width: 25 },
      { header: "createdAt", key: "createdAt", width: 25 },
    ];

    // Add rows
    data.forEach((item) => {
      sheet.addRow(item);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

}
