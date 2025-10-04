import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Conversation } from 'src/conversations/entities/conversation.entity';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @UseGuards(JwtGuard)
  @Post()
  createMessage(
    @CurrentUser() user: User,
    @Body() createMessageDto: CreateMessageDto
  ) {
   
    return this.messagesService.createMessage(createMessageDto,user);
  }

  @Get()
  getMessageSender(
    @Query() conversation: Conversation,
  ) {
    return this.messagesService.getMessageSender(conversation);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.messagesService.delete(id);
  }
}
