import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { hash } from 'bcryptjs';

describe('Authenticate (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = await moduleRef.get(PrismaService);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  test('[POST] /sessions', async () => {
    await prisma.user.create({
      data: {
        name: 'Test',
        email: 'test@gmail.com',
        password: await hash('12345678', 8),
      },
    });

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'test@gmail.com',
      password: '12345678',
    });

    expect(response.statusCode).toBe(201);

    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
