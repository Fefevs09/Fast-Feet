import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class ProtectController {
  constructor() {}

  @Post()
  async handle() {
    return 'ok';
  }
}
