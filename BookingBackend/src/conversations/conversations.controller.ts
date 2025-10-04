import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { CurrentUser } from 'src/decorators/user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) { }

  @UseGuards(JwtGuard)
  @Post()
  create(
    @CurrentUser() user: User,
    @Body() receiver) {
    return this.conversationsService.createConversation(user, receiver);
  }

  @Get()
  findAll() {
    return this.conversationsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get("current")
  findConvos(
    @CurrentUser() user: User,
    @Param('userId') id: number) {
    return this.conversationsService.getConvoUsers(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConversationDto: UpdateConversationDto) {
    return this.conversationsService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.conversationsService.delete(id);
  }
}
