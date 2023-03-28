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
        throw new Error();
      }
      const dialog = await this.dialogRepository.create(dto.usersId);
      const messageDto: CreateMessageDto = {
        authorId: dto.authorId,
        text: dto.text,
        dialogId: dialog.id,
      };
      return this.messagesRepository.create(messageDto);
    } catch (error) {
      throw new ForbiddenException('Incorrect credentials');
    }
  }
  async getAllDialogsById(id: number) {
    const dialogs = await this.dialogRepository.findAll(id);
    dialogs.forEach(el => {
      el.Messages.forEach(mess => {
        delete mess.author.hash;
        delete mess.author.noticeRoomId;
      });
    });
    return dialogs;
  }
  async getDialogById({
    userId,
    dialogId,
  }: {
    userId: number;
    dialogId: string;
  }) {
    try {
      const dialog = await this.dialogRepository.findById(dialogId);
      console.log(
        dialog.usersId.find(el => el === userId),
        `userId: ${userId}`,
      );
      if (!dialog || !dialog.usersId.find(el => el === userId)) {
        throw new Error();
      }
      return dialog;
    } catch (error) {
      throw new ForbiddenException('Incorrect data');
    }
  }
  async addMessage(dto: CreateMessageDto) {
    return this.messagesRepository.create(dto);
  }
}
