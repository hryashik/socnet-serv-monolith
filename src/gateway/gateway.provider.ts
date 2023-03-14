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

enum EventType {
  NEW_MESSAGE = "newMessage"
}

@WebSocketGateway()
export class GatewayProvider implements OnModuleInit {
  constructor(
    private readonly dialogService: DialogService,
    private readonly prisma: PrismaService,
    private readonly messageService: MessageService,
  ) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', socket => {
      const room = socket.request.headers.rooms;
      socket.join(room);
    });
  }

  @SubscribeMessage('newMessage')
  handler(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    console.log(client.request.headers.rooms);
  }

  sendMessage(body: string) {
    this.server.to('1337').emit('newMessage', body);
  }

  @UseFilters(WsExceptionFilter)
  @UsePipes(ValidationPipe)
  @SubscribeMessage('create-dialog')
  async createDialog(
    @MessageBody() body: CreateDialogDto,
    @ConnectedSocket() client: Socket,
  ) {
    const dialog = await this.dialogService.createDialog(body);
    client.emit('newMessage', dialog);
  }

  @UseFilters(WsExceptionFilter)
  @UsePipes(ValidationPipe)
  @SubscribeMessage('create-message')
  async createMessage(
    @MessageBody() body: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    await this.messageService.createMessage(body);
    this.server.to(body.dialogId.toString()).emit('newMessage', body);
  }

  notification(usersArray: number[], event: EventType) {
    
  }
}
