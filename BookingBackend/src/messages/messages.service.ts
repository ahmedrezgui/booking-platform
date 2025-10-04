import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CrudService } from 'src/common/services/crud.service';
import { ConversationsService } from 'src/conversations/conversations.service';

@Injectable()
export class MessagesService extends CrudService<Message> {

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,

    private readonly conversationService: ConversationsService,

  ) {
    super(messageRepository)
  }

  async createMessage(createMessageDto: CreateMessageDto,sender:User) {
    const { conversationId, receiverMail, message } = createMessageDto;
    if (!sender || !message) throw new Error("message error");
    if (!conversationId && receiverMail) {
      const receiver = await this.userRepository.findOneBy({ email: receiverMail });
      const newConvo = await this.conversationService.createConversation(sender, receiverMail)
      const newMessage = new Message();
      newMessage.conversation = newConvo;
      newMessage.text = message;
      newMessage.sender = sender;
      newMessage.receiver = receiver;
      return await this.messageRepository.save(newMessage);
    } else if (!conversationId && !receiverMail) {
      throw new Error("fill required fields");
    }
    const convo = await this.conversationRepository.findOneBy({ id: conversationId });
    const receiver = await this.userRepository.findOneBy({ email: receiverMail });
    const newMessage = new Message();
    newMessage.conversation = convo;
    newMessage.text = message;
    newMessage.sender = sender;
    newMessage.receiver = receiver;

    return await this.messageRepository.save(newMessage);
  }

  async getMessageSender(conversation: Conversation) {
    const messages = await this.messageRepository.find({ where: { conversation } })
    const messageUserData = Promise.all(messages.map(async (message) => {
      const user = await this.userRepository.findOneBy({ id: message.sender.id });
      return { user: { email: user.email, name: user.name }, message: message.text };
    }));
    return messageUserData;
  }

  findOne(id: number) {
    return super.findOne(id);
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return super.update(id, updateMessageDto);
  }

  async delete(id: number) {
   const message = await this.messageRepository.findOneBy({id})
    return super.remove(message);
  }
}
