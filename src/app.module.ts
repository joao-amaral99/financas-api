import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot(), CategoryModule, ExpensesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
