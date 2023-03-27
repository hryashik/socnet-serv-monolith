import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DialogRepositoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(usersId: number[]) {
    const dialog = this.prisma.dialog.create({
      data: {
        usersId,
      },
    });
    return dialog;
  }
  findById(id: string) {
    return this.prisma.dialog.findUnique({
      where: {
        id,
      },
    });
  }
  async findAll(id: number) {
    return this.prisma.dialog.findMany({
      where: {
        usersId: {
          has: id
        }
      },
      include: {
        Message: true
      }
    })
  }
}
