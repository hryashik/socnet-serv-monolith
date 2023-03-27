import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesRepositoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        ...dto,
      },
    });
  }
}
