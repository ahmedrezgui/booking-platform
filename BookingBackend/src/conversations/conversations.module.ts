import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, User]),
    UsersModule,
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService],
  exports:[ConversationsService]
})
export class ConversationsModule { }
