import {
  OnModuleInit,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DialogService } from 'src/dialog/dialog.service';
import { CreateDialogDto } from 'src/dialog/dto/create-dialog.dto';
import { WsExceptionFilter } from 'src/dialog/wsException.filter';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { MessageService } from 'src/message/message.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepositoryService } from 'src/repositories/usersRepository/usersRepository.service';

enum EventType {
  NEW_MESSAGE = "newMessage"
}

@WebSocketGateway()
export class GatewayProvider implements OnModuleInit {
  constructor(
    private readonly dialogService: DialogService,
    private readonly usersRepository: UsersRepositoryService,
    private readonly messageService: MessageService,
  ) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', socket => {
      const rooms = socket.request.headers.rooms;
      socket.join(rooms);
    });
  }

  @UseFilters(WsExceptionFilter)
  @UsePipes(ValidationPipe)
  @SubscribeMessage('start-dialog')
  async createDialog(
    @MessageBody() body: CreateDialogDto,
    @ConnectedSocket() client: Socket,
  ) {
    const {text, usersId, authorId} = body
    const dialog = await this.dialogService.createDialog(usersId);
    const dtoMessage: CreateMessageDto = {
      dialogId: dialog.id,
      authorId,
      text
    }
    const message = this.messageService.createMessage(dtoMessage)
  }

  @UseFilters(WsExceptionFilter)
  @UsePipes(ValidationPipe)
  @SubscribeMessage('newMessage')
  async createMessage(
    @MessageBody() body: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messageService.createMessage(body);
    this.server.to(body.dialogId).emit('newMessage', message);
  }

  async createNoticeEvent(userId: number) {
    const user = await this.usersRepository.findById(userId)
    
  }
}
