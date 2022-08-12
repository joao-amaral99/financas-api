import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Category } from '@prisma/client';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany({ include: { expenses: true } });
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<Category> {
    try {
      return await this.prisma.category.findUnique({
        where,
      });
    } catch (error) {
      throw new InternalServerErrorException('Id informado não existe');
    }
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    try {
      return await this.prisma.category.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Já existe categoria com esse nome',
      );
    }
  }

  async update(id: number, data: UpdateCategoryDto): Promise<Category> {
    try {
      const user = await this.findOne({ id });

      if (user) {
        return await this.prisma.category.update({
          where: { id },
          data,
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Opa, algo deu errado, tente novamente',
      );
    }
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<Category> {
    try {
      return await this.prisma.category.delete({
        where,
      });
    } catch (error) {
      throw new InternalServerErrorException('Id informado não existe');
    }
  }
}
