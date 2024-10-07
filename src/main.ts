import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from '../src/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: true,
  });

  const wasValidate: boolean = true;

  const configService: ConfigService<Env, typeof wasValidate> =
    app.get(ConfigService);
  const PORT = configService.get('PORT', { infer: true });

  await app.listen(PORT);
}
bootstrap();
