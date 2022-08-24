import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async login(user: Partial<User>) {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    await this.tokenService.save(token, user.email);

    return {
      token,
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
