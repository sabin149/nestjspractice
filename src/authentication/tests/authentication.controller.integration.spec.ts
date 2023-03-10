import { AuthenticationController } from './../authentication.controller';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { mockedJwtService } from './../../utils/mocks/jwt.service';
import { mockedConfigService } from './../../utils/mocks/config.service';
import { UsersService } from './../../users/users.service';
import { User } from './../../users/entities/user.entity';
import { AuthenticationService } from '../authentication.service';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';

const mockedUser: User = {
  id: '10519bb0-abe7-487a-9182-e0b935651588',
  email: 'sabin@email.com',
  name: 'sabin',
  password: 'hash123456',
  posts: [],
  address: {
    id: '10519bb0-abe7-487a-9182-e0b935651586',
    street: 'street',
    city: 'city',
    country: 'country',
    user: {} as User,
  },
};

jest.mock('bcrypt');

describe('The AuthenticationController', () => {
  let app: INestApplication;
  let userData: User;
  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };
    const usersRepository = {
      create: jest.fn().mockResolvedValue(userData),
      save: jest.fn().mockReturnValue(Promise.resolve()),
    };

    const module = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        UsersService,
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  describe('when registering with invalid data', () => {
    it('should respond with error', () => {
      const expectedData = {
        ...userData,
      };
      delete expectedData.password;
      return request(app.getHttpServer())
        .post('/authentication/register')
        .send({
          email: mockedUser.email,
          name: mockedUser.name,
          password: 'strongPassword',
          address: mockedUser.address,
          user: mockedUser,
        })
        .expect(201)
        .expect(expectedData);
    });
  });
  describe('when login with valid data', () => {
    it('should respond with the data of the user without the password', () => {
      const expectedData = {
        ...userData,
      };
      delete expectedData.password;
      return request(app.getHttpServer())
        .post('/authentication/login')
        .send({
          email: 'sabin@gmail.com',
          password: '123456',
        })
        .expect(201)
        .expect(expectedData);
    });
  });
  //   describe('when registering with invalid data', () => {
  //     it('should throw an error', () => {
  //       return request(app.getHttpServer())
  //         .post('/authentication/register')
  //         .send({
  //           name: mockedUser.name,
  //         })
  //         .expect(400);
  //     });
  //   });
});
