import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, // habilita CORS
  });

  // Segurança básica
  app.use(helmet());

  // Validação automática dos DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos não esperados
      forbidNonWhitelisted: true, // rejeita se vier algo fora do DTO
      transform: true, // transforma para classes
    }),
  );

  // Prefixo global para manter a API organizada
  app.setGlobalPrefix('api');

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
  console.log(`🚀 API Weather rodando na porta ${PORT}`);
}

bootstrap();
