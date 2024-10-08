import { PrismaService } from 'src/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { assert, afterEach, beforeEach, describe, it } from 'poku';

let app: INestApplication;
let prisma: PrismaService;

const userLogin = {
  name: 'User',
  email: 'user@example.com',
  password: 'user123456',
};

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  prisma = app.get<PrismaService>(PrismaService);
  const { email, password, name } = userLogin;
  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
});

afterEach(async () => {
  const { email } = userLogin;

  await prisma.user.delete({
    where: {
      email,
    },
  }); // Clear the users table again
  await app.close();
});

const BASE_URL = 'http://localhost:6969';
describe('POST /questions', () => {
  it('should return Unauthorized', async () => {
    const response = await fetch(`${BASE_URL}/questions`, {
      method: 'POST',
    });

    assert.equal(response.status, 401);
    const responseBody = await response.json();
    assert.equal(responseBody.message, 'Unauthorized');
  });

  it('should return ok', async () => {
    const responseGetToken = await fetch(`${BASE_URL}/sessions`, {
      method: 'POST',
      headers: {
        body: JSON.stringify(userLogin),
        'Content-Type': 'application/json',
      },
    });

    const token = await responseGetToken.json();

    const BEARER_TOKEN = token.access_token;

    const bearer = 'Bearer' + BEARER_TOKEN;

    const response = await fetch(`${BASE_URL}/questions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/json',
      },
    });

    const responseBody = await response.json();

    assert.equal(responseBody, 'ok');
  });
});
