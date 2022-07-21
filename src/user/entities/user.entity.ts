import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  name: string;
  email: string;
  password: string;
}
