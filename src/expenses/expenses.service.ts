import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Expenses } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Expenses[]> {
    return await this.prisma.expenses.findMany();
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<Expenses> {
    try {
      return await this.prisma.expenses.findUnique({ where });
    } catch (error) {
      throw error.message;
    }
  }

  async create(data: CreateExpenseDto): Promise<Expenses> {
    try {
      return await this.prisma.expenses.create({
        data,
      });
    } catch (error) {
      throw error.message;
    }
  }

  async update(id: number, data: UpdateExpenseDto): Promise<Expenses> {
    try {
      const expense = await this.findOne({ id });

      if (!expense) {
        throw new Error('Expense not found');
      }

      return await this.prisma.expenses.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error.message;
    }
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<Expenses> {
    try {
      return await this.prisma.expenses.delete({ where });
    } catch (error) {
      throw error.message;
    }
  }
}
