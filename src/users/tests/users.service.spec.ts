import { AuthenticationService } from './../../authentication/authentication.service';
import { mockedJwtService } from './../../utils/mocks/jwt.service';
import { mockedConfigService } from './../../utils/mocks/config.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('The UsersService', () => {
  let usersService: UsersService;
  let authenticationService: AuthenticationService;
  let findOne: jest.Mock;
  beforeEach(async () => {
    findOne = jest.fn();
    const module = await Test.createTestingModule({
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
          useValue: {
            findOne,
          },
        },
      ],
    }).compile();
    usersService = module.get<UsersService>(UsersService);
    authenticationService = module.get<AuthenticationService>(
      AuthenticationService,
    );
  });
  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });
      it('should return the user', async () => {
        const fetchedUser = await usersService.getByEmail('sabin3@gmail.com');
        expect(fetchedUser).toEqual(user);
      });
    });
    describe("when getting a user's id", () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });
      it('should return the user', async () => {
        const fetchedUser = await usersService.getById(
          '17888a60-ad20-43a0-be1c-5136e31ecebc',
        );
        expect(fetchedUser).toEqual(user);
      });
    });
    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });
      it('should throw an error', async () => {
        await expect(
          usersService.getByEmail('test@test.com'),
        ).rejects.toThrow();
      });
    });
  });
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = '17888a60-ad20-43a0-be1c-5136e31ecebc';
      expect(
        typeof authenticationService.getCookieWithJwtToken(userId),
      ).toEqual('string');
    });
  });
});
