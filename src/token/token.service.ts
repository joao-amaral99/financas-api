import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async save(hash: string, email: string) {
    const userToken = await this.prisma.token.findUnique({
      where: { email: email },
    });

    if (userToken) {
      await this.prisma.token.update({
        where: { email: userToken.email },
        data: { hash: hash },
      });
    }

    this.prisma.token.create({
      data: {
        hash,
        email,
      },
    });
  }

  async refreshToken(oldToken: string) {
    const token = await this.prisma.token.findFirst({
      where: { hash: oldToken },
    });

    if (token) {
      const user = await this.userService.findOne({ email: token.email });
      return this.authService.login(user);
    }

    return new HttpException(
      {
        message: 'Token inválido',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
