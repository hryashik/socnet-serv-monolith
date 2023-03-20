import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDialogDto } from './dto/create-dialog.dto';

@Injectable()
export class DialogService {
  constructor(private readonly prisma: PrismaService) {}
  createDialog(usersId: number[]) {
    const dialog = this.prisma.dialog.create({
      data: {
        usersId
      },
    });
    return dialog;
  }
  findById(id: string) {
    return this.prisma.dialog.findUnique({
      where: {
        
      }
    })
  }
}
