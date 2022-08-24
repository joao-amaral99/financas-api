import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  constructor(private readonly prismaService: PrismaService) {}

  async save(hash: string, email: string) {
    const userToken = await this.prismaService.token.findUnique({
      where: { email: email },
    });

    if (userToken) {
      await this.prismaService.token.update({
        where: { email: userToken.email },
        data: { hash: hash },
      });
    }

    await this.prismaService.token.create({
      data: {
        hash,
        email,
      },
    });
  }
}
