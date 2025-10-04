// src/auth/auth.service.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginCredentialsDto } from '../users/dto/login-cerdentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async subscribe(userData: CreateUserDto): Promise<Partial<User>> {
    const { name, password, email, phoneNumber } = userData;
    const user = this.userRepository.create({
      ...userData,
    });

    // VULN: store password in plaintext (no hashing)
    user.salt = '';
    user.password = password; // DO NOT DO THIS IN REAL CODE

    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(`An account was already created with this mail`);
    }
    return {
      id: user.id,
      name,
      email,
      phoneNumber,
    };
  }

  async login(credentials: LoginCredentialsDto) {
    const { login, password } = credentials;

    // VULN: SQL injection via unsafe string concatenation
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where(`user.email = '${login}'`) // DO NOT DO THIS
      .getOne();

    if (!user) {
      throw new NotFoundException('Wrong credentials');
    }

    // VULN: compare plaintext strings (since we stored plaintext above)
    const match = user.password === password;

    if (match) {
      // VULN: long-lived token with user-controlled role from DB (no checks)
      const payload = {
        name: user.name,
        email: user.email,
        role: user.role,
      };
      const jwt = await this.jwtService.sign(payload);
      return {
        token: jwt,
        userId: user.id,
        userRole: user.role,
      };
    } else {
      throw new NotFoundException('Wrong credentials');
    }
  }
}
