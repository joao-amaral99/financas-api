import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: Partial<User>) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validate(email: string, password: string) {
    let user: Partial<User>;

    try {
      user = await this.userService.findOne({ email });

      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) return null;
    } catch (error) {
      return null;
    }

    return user;
  }
}
