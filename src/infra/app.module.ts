import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { AuthModule } from '@/infra/auth/auth.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { AuthenticateController } from '@/infra/http/controllers/authenticate-controller';
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller';
import { ProtectController } from '@/infra/http/controllers/protect-route.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],

  controllers: [
    CreateAccountController,
    AuthenticateController,
    ProtectController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
