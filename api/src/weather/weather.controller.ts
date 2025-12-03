// src/weather/weather.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { Response } from "express";
import { ApiKeyGuard } from 'src/auth/api-key.guard';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  /**
   * Endpoint usado pelo worker Go para enviar o payload
   * POST /api/weather
   */
  @Post()
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateWeatherDto | any) {
    // service will handle raw vs dto automatically
    const doc = await this.weatherService.create(payload);
    return { id: doc._id, createdAt: doc };
  }

  /**
   * GET /api/weather?limit=50&skip=0
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('limit') limit = '20', @Query('skip') skip = '0') {
    const l = Math.max(1, Math.min(1000, parseInt(limit as string, 10) || 100));
    const s = Math.max(0, parseInt(skip as string, 10) || 0);
    return this.weatherService.findAll(l, s);
  }

  /**
   * GET /api/weather/:id
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.weatherService.findOne(id);
  }

  /**
   * DELETE /api/weather/:id
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    await this.weatherService.delete(id);
    return { message: 'deleted' };
  }

  @Get("export/csv")
  @UseGuards(JwtAuthGuard)
  async exportCsv(@Res() res: Response) {
    const buffer = await this.weatherService.exportCsv();

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=weather.csv");
    res.send(buffer);
  }

  @Get("export/xlsx")
  @UseGuards(JwtAuthGuard)
  async exportXlsx(@Res() res: Response) {
    const buffer = await this.weatherService.exportXlsx();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=weather.xlsx");

    res.send(buffer);
  }
}
