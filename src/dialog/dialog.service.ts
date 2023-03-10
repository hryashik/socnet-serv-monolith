import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDialogDto } from './dto/create-dialog.dto';

@Injectable()
export class DialogService {
  constructor(private readonly prisma: PrismaService) {}
  createDialog(dto: CreateDialogDto) {
    const dialog = this.prisma.dialog.create({
      data: {
        ...dto,
      },
    });
    return dialog;
  }
}
