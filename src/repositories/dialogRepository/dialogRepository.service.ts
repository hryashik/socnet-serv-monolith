import { Injectable } from '@nestjs/common';
import { Dialog } from '@prisma/client';
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
  async findById(id: string): Promise<Dialog | undefined> {
    return this.prisma.dialog.findUnique({
      where: {
        id,
      },
      include: {
        Messages: true,
      }
    });
  }
  async findAll(id: number) {
    return this.prisma.dialog.findMany({
      where: {
        usersId: {
          has: id
        },
      },
      include: {
        Messages: {
          include: {
            author: true,
          }
        }
      }
    })
  }
}
