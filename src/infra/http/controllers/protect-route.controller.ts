import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Post, UseGuards } from '@nestjs/common';

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class ProtectController {
  constructor() {}

  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user);
  }
}
