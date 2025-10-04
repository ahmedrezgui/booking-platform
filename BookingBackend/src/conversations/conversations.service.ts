import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { Any, Repository } from 'typeorm';
import { CrudService } from 'src/common/services/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ConversationsService extends CrudService<Conversation> {

  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>

  ) {
    super(conversationRepository);
  }

  async createConversation(user: User, data) {
    const receiver = await this.userRepository.findOne({ where: { email: data.email } });
    const conversation = new Conversation();
    conversation.members = [user, receiver];
    return await this.conversationRepository.save(conversation);

  }

  findAll() {
    return super.findAll();
  }

  async getConvoUsers(user: User) {
    const conversationsUser = await this.conversationRepository
      .createQueryBuilder('conversation')
      .innerJoinAndSelect('conversation.members', 'member', 'member.id = :userId', { userId: user.id })
      .innerJoinAndSelect('conversation.members', 'otherMember')
      .leftJoinAndSelect('conversation.messages', 'message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
      .select(['conversation.id', 'otherMember.id', 'otherMember.name', 'otherMember.email', 'otherMember.avatar_url', 'message', 'sender.name', 'receiver.name', 'sender.email', 'receiver.email','sender.id', 'receiver.id'])
      .where('otherMember.id <> :currentUserId', { currentUserId: user.id })
      .getMany();

    return conversationsUser;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return super.update(id, updateConversationDto);
  }

  async delete(id: number) {
    const converstaion = await this.conversationRepository.findOne({ where: { id } });
    return super.remove(converstaion);
  }
}
