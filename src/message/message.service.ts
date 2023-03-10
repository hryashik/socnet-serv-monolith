import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}
  async createMessage() {
    this.prisma.message.create({
      data: {
        
      }
    })
  }
}
