import { Message } from "src/messages/entities/message.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Conversation {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(
        () => User,
        user => user.conversations,
        {
            cascade: true,
            nullable: false,
            eager: true,
        }
    )
    @JoinTable()
    members: User[];

    @OneToMany(
        () => Message,
        message => message.conversation,
        {
            nullable: true,
            eager: true,
        }
    )
    messages: Message[];
}
