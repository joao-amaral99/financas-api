import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly _select = {
    id: true,
    name: true,
    email: true,
    password: false,
  };

  async findAll(): Promise<UserModel[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw error.message;
    }
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel> {
    try {
      return await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
    } catch (error) {
      throw error.message;
    }
  }

  async create(data: CreateUserDto) {
    const { password } = data;

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    try {
      return await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hash,
        },
        select: this._select,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Já existe registro com esse email',
      );
    }
  }

  async update(id: number, data: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error.message;
    }
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    try {
      return await this.prisma.user.delete({
        where,
      });
    } catch (error) {
      throw error.message;
    }
  }
}
