import { assert, it, describe, afterEach, beforeEach, sleep } from 'poku';
import { PrismaService } from 'src/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { compare } from 'bcryptjs';
import { fetchCreateUser } from '../../test/util/fetch-create-user';

let app: INestApplication;
let prisma: PrismaService;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  prisma = app.get<PrismaService>(PrismaService);
  // await prisma.user.deleteMany(); // Clear the users table
  await sleep(2000);
});

afterEach(async () => {
  // await prisma.user.deleteMany(); // Clear the users table again
  await app.close();
});

describe('POST /accounts', () => {
  it('should create a new account', async () => {
    const user = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    };

    const response = await fetchCreateUser({ user });

    assert.equal(response.status, 201);

    const verifyUserExist = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!verifyUserExist) {
      assert.fail('User not found in create new account');
    }

    assert.equal(verifyUserExist.name, user.name);
    assert.equal(verifyUserExist.email, user.email);

    const passwordCompare = await compare(
      user.password,
      verifyUserExist.password,
    );
    assert.equal(passwordCompare, true);
  });

  it('should return status code 400 when a field is missing', async () => {
    const testUser = {
      email: 'testuser2@example.com',
      password: 'password123',
    };

    const response = await fetchCreateUser({ user: testUser });

    const responseBody = await response.json();

    assert.equal(response.status, 400);
    assert.equal(responseBody.message, 'Validation failed');
    assert.equal(responseBody.errors.name, 'ZodValidationError');

    const userDb = await prisma.user.findUnique({
      where: {
        email: testUser.email,
      },
    });

    assert.equal(userDb, null);
  });

  it('should return errors when trying to create an account with the same email', async () => {
    const userFulano = {
      name: 'Fulano',
      email: 'cicrano@example.com',
      password: 'fulano1234',
    };

    const userBeltrano = {
      name: 'Beltrano',
      email: 'cicrano@example.com',
      password: 'beltrano1234',
    };

    const response = await fetchCreateUser({ user: userFulano });

    assert.equal(response.status, 201);

    const verifyUserExist = await prisma.user.findUnique({
      where: {
        email: userFulano.email,
      },
    });

    if (!verifyUserExist) {
      assert.fail('User not found in create user with same email');
    }

    assert.equal(verifyUserExist.name, 'Fulano');
    assert.equal(verifyUserExist.email, userFulano.email);

    const passwordCompare = await compare(
      userFulano.password,
      verifyUserExist.password,
    );
    assert.equal(passwordCompare, true);

    const responsePostNewUser = await fetchCreateUser({ user: userBeltrano });

    assert.equal(responsePostNewUser.status, 409);

    const verifyRepetedUser = await prisma.user.findMany({
      where: {
        email: 'cicrano@example.com',
      },
    });

    assert.equal(verifyRepetedUser.length, 1);
  });
});
