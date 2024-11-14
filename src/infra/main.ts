import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from '@/infra/env/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Fast feet API')
    .setDescription('Fast feet product transporter')
    .setVersion('1.0')
    .addTag('fast')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const wasValidate: boolean = true;

  const configService: ConfigService<Env, typeof wasValidate> =
    app.get(ConfigService);
  const PORT = configService.get('PORT', { infer: true });

  await app.listen(PORT);
}
bootstrap();
