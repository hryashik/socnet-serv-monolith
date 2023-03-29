import {
  OnModuleInit,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
import { WsExceptionFilter } from 'src/gateway/wsException.filter';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepositoryService } from 'src/repositories/usersRepository/usersRepository.service';
import { JwtAuthGuard } from 'src/services/guards/jwt-auth.guard';

enum EventType {
  NEW_MESSAGE = 'newMessage',
}

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
})
export class GatewayProvider implements OnModuleInit {
  constructor(
    private readonly dialogService: DialogService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', socket => {
      /* console.log(socket.handshake); */
    });
  }
  @UseFilters(WsExceptionFilter)
  @UseGuards(AuthGuard('jwtws'))
  @SubscribeMessage('newMessage')
  handler(@MessageBody() body, @ConnectedSocket() client: Socket) {
    console.log(client.handshake.headers)
  }

  /* @UseFilters(WsExceptionFilter)
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

  @SubscribeMessage('get-dialog')
  async check(
    @MessageBody() body: {id: string},
    @ConnectedSocket() client: Socket,
  ) {
    const dialog = await this.dialogService.findById(body.id)
    console.log(dialog)
    client.send('newMessage', dialog)
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
    
  } */
}
