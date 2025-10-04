import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, ConflictException } from '@nestjs/common';

// Build a chainable queryBuilder mock (for .where().getOne())
const makeQB = (toReturn: any) => ({
  where: jest.fn().mockReturnThis(),
  getOne: jest.fn().mockResolvedValue(toReturn),
});

describe('AuthService', () => {
  let service: AuthService;

  const userRepoMock = {
    create: jest.fn((u) => ({ id: 1, ...u })),
    save: jest.fn().mockResolvedValue(undefined),
    // swap this return value in each test to simulate user/not user
    createQueryBuilder: jest.fn(() => makeQB(null)),
  };

  const jwtMock = {
    sign: jest.fn().mockResolvedValue('jwt-token-123'),
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: userRepoMock },
        { provide: JwtService, useValue: jwtMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('subscribe', () => {
    it('saves a new user and returns public fields', async () => {
      const dto = { name: 'A', email: 'a@test.tld', password: 'pass', phoneNumber: '123' } as any;

      const res = await service.subscribe(dto);

      expect(userRepoMock.create).toHaveBeenCalled();
      expect(userRepoMock.save).toHaveBeenCalled();
      expect(res).toEqual({
        id: 1,
        name: 'A',
        email: 'a@test.tld',
        phoneNumber: '123',
      });
    });

    it('throws ConflictException on duplicate email', async () => {
      userRepoMock.save.mockRejectedValueOnce(new Error('duplicate'));
      await expect(service.subscribe({} as any)).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('login', () => {
    it('throws NotFound when user not found', async () => {
      // simulate not found
      userRepoMock.createQueryBuilder.mockReturnValueOnce(makeQB(null));
      await expect(service.login({ login: 'x', password: 'y' } as any))
        .rejects.toBeInstanceOf(NotFoundException);
    });

    it('returns token when password matches', async () => {
      // simulate found user with plaintext password (as in your vuln mode)
      const fakeUser = {
        id: 1,
        name: 'Neo',
        email: 'neo@matrix.io',
        role: 'USER',
        password: 'secret',
        isValid: true,
      };
      userRepoMock.createQueryBuilder.mockReturnValueOnce(makeQB(fakeUser));

      const res = await service.login({ login: 'neo@matrix.io', password: 'secret' } as any);

      expect(jwtMock.sign).toHaveBeenCalledWith({
        name: 'Neo',
        email: 'neo@matrix.io',
        role: 'USER',
      });
      expect(res).toEqual({
        token: 'jwt-token-123',
        userId: 1,
        userRole: 'USER',
      });
    });
  });
});
