import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherModule } from './weather/weather.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Conexão com o MongoDB
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://mongo:27017/weatherdb'),

    WeatherModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
