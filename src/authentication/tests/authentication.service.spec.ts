import { mockedJwtService } from './../../utils/mocks/jwt.service';
import { mockedConfigService } from './../../utils/mocks/config.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthenticationService } from '../authentication.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('The AuthenticationService', () => {
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
  describe('when accessing the data of authenticating user', () => {
    it('should attempt to get the user by email', async () => {
      const getByEmailSpy = jest.spyOn(usersService, 'getByEmail');
      await authenticationService.getAuthenticatedUser(
        'sabin@gmail.com',
        '123456',
      );
      expect(getByEmailSpy).toBeCalledTimes(1);
    });
  });
});
