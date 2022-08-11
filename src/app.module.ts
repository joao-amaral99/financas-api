import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot(), CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
