import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Message } from './entities/message.entity';
import { UsersModule } from 'src/users/users.module';
import { Conversation } from 'src/conversations/entities/conversation.entity';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { ConversationsService } from 'src/conversations/conversations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, User,Conversation]),
    UsersModule,
    ConversationsModule
  ],
  controllers: [MessagesController],
  providers: [MessagesService,ConversationsService],
})
export class MessagesModule { }
