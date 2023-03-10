import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}
  async createMessage(dto: CreateMessageDto) {
    const message = await this.prisma.message.create({
      data: {
        ...dto,
      },
    });
    return message;
  }
}
