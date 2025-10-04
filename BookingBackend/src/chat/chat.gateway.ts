import { OnModuleInit } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8001, { cors: 'http://localhost:3001' })
export class ChatGateway implements OnModuleInit {


  @WebSocketServer()
  server: Server;

  private users = [];

  onModuleInit() {
    this.server.on('connection', (socket) => {
      socket.on('join', userId => {
        const userExists = this.users.find(user => user.userId === userId);
        if (!userExists) {
          const user = { userId, socketId: socket.id };
          this.users.push(user);
          this.server.emit('getUsers', this.users);
        }

      });

      socket.on('disconnect', () => {
        this.users = this.users.filter(user => user.socketId !== socket.id);
        this.server.emit('getUsers', this.users);
      })
    });
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() message, @ConnectedSocket() client: Socket) {

    const receiver = this.users.find((user) => user.userId == message.receiver.id);
    if (receiver) {
      this.server.to([client.id, receiver.socketId]).emit('getMessage', message);
    } else {
      this.server.to(client.id).emit('getMessage', message);
    }

  }
}
