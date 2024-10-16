import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateAccountController } from 'src/controllers/create-account.controller';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from 'src/controllers/authenticate-controller';
import { ProtectController } from 'src/controllers/protect-route.controller';
import { PrismaService } from 'src/prisma/prisma.service';

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
