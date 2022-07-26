import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    UserModule,
    TokenModule,
    JwtModule.register({
      privateKey: process.env.SECRET_KEY,
      signOptions: { expiresIn: '864000s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
