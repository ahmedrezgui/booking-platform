import { JwtStrategy } from '../strategy/passport-jwt.strategy';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

describe('JwtStrategy', () => {
  it('accepts payload without DB (vuln behavior)', async () => {
    const strat = new JwtStrategy({ findOneBy: jest.fn() } as any);
    const u = await strat.validate({ email: 'a@test.tld' } as any);
    expect(u.email).toBe('a@test.tld');
  });
});
