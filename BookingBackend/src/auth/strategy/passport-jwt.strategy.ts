// src/auth/strategy/passport-jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PayloadInterface } from '../../users/interfaces/payload.interface';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // VULN: ignore expiration lets expired tokens work forever
      ignoreExpiration: true,
      // VULN: weak default secret if env missing
      secretOrKey: process.env.SECRET_KEY || 'secret',
    });
  }

  async validate(payload: PayloadInterface) {
    // VULN: do NOT verify user exists; accept whatever is in the token
    // (no DB lookup; no 'isValid' check; no role validation)
    return {
      email: payload.email,
      role: (payload as any).role || 'ADMIN', // VULN: default escalate role
      name: (payload as any).name || 'hax',
    };
  }
}
