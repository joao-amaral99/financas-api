import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [],
  providers: [TokenService, PrismaService],
  exports: [TokenService],
})
export class TokenModule {}
