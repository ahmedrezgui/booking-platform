import { Conversation } from "src/conversations/entities/conversation.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(
        () => User,

        {
            nullable: false,
            eager: true,
        }
    )
    sender: User;


    @ManyToOne(
        () => User,

        {
            nullable: false,
            eager: true,
        }
    )
    receiver: User;

    @ManyToOne(
        () => Conversation,
        conversation => conversation.messages,
        {
            nullable: false,
            eager: false,
        }
    )
    conversation: Conversation;
}
