import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DialogRepositoryService } from 'src/repositories/dialogRepository/dialogRepository.service';
import { CreateMessageDto } from 'src/repositories/messagesRepository/dto/create-message.dto';
import { MessagesRepositoryService } from 'src/repositories/messagesRepository/messagesRepository.service';
import { UsersRepositoryService } from 'src/repositories/usersRepository/usersRepository.service';
import { CreateDialogDto } from './dto/create-dialog.dto';

@Injectable()
export class DialogService {
  constructor(
    private readonly dialogRepository: DialogRepositoryService,
    private readonly messagesRepository: MessagesRepositoryService,
  ) {}
  async startDialog(dto: CreateDialogDto) {
    try {
      if (!dto.usersId.find(el => el === dto.authorId)) {
        throw new Error()
      }
      const dialog = await this.dialogRepository.create(dto.usersId);
      const messageDto: CreateMessageDto = {
        authorId: dto.authorId,
        text: dto.text,
        dialogId: dialog.id,
      };
      return this.messagesRepository.create(messageDto);
    } catch (error) {
      throw new ForbiddenException('Incorrect credentials')
    }
  }
  async getAllDialogsById(id: number) {
    return this.dialogRepository.findAll(id);
  }
}
