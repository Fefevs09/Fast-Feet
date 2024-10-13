import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { CreateAccountBodySchema } from 'src/controllers/create-account.controller';
import { PrismaService } from 'src/prisma/prisma.service';

describe('Create Account (e2e)', () => {
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

  test('should return 201', async () => {
    const userTest: CreateAccountBodySchema = {
      name: 'Test',
      email: 'test@gmail.com',
      password: '12345678',
    };
    const { name, email, password } = userTest;
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name,
      email,
      password,
    });

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });
});
