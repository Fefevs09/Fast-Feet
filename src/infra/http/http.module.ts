import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from '@/infra/http/controllers/authenticate-controller';
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller';
import { ProtectController } from '@/infra/http/controllers/protect-route.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    ProtectController,
  ],
  providers: [],
})
export class HttpModule {}
