import { assert, it, describe, afterEach, beforeEach } from 'poku';
import { PrismaService } from 'src/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';

let app: INestApplication;
let prisma: PrismaService;
let jwtService: JwtService;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  prisma = app.get<PrismaService>(PrismaService);
  jwtService = app.get<JwtService>(JwtService);
  await prisma.user.deleteMany(); // Clear the users table
});

afterEach(async () => {
  await prisma.user.deleteMany(); // Clear the users table again
  await app.close();
});

describe('POST /sessions', () => {
  it('should authenticate a user and return a JWT token', async () => {
    const password = 'password123';
    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'testuser@example.com',
        password: hashedPassword,
      },
    });

    const response = await fetch('http://localhost:6969/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, password }),
    });

    const responseBody = await response.json();

    assert.equal(response.status, 201);
    assert.ok(responseBody.access_token);

    const decodedToken = jwtService.verify(responseBody.access_token);
    assert.equal(decodedToken.sub, user.id);
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await fetch('http://localhost:6969/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'wrong@example.com',
        password: 'wrongpass',
      }),
    });

    assert.equal(response.status, 401);
  });
});
