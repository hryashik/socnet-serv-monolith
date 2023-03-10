import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DialogService } from 'src/dialog/dialog.service';

@WebSocketGateway()
export class GatewayProvider implements OnModuleInit {
  constructor(private readonly dialogService: DialogService) {

  }
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', socket => {
      const room = socket.request.headers.rooms
      socket.join(room)
    })
  }

  @SubscribeMessage('newMessage')
  handler(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    console.log(client.request.headers.rooms)
  }

  sendMessage(body: string) {
    this.server.to('1337').emit('newMessage', body)
  }
  @SubscribeMessage('create-dialog')
  createDialog() {
    
  }
}
