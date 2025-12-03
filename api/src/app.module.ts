import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherModule } from './weather/weather.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { InsightsModule } from './insights/insights.module';
import { GroqModule } from './groq/groq.module';

@Module({
  imports: [
    // Conexão com o MongoDB
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://mongo:27017/weatherdb'),
    GroqModule,
    InsightsModule,
    WeatherModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
