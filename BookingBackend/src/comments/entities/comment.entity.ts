import { Listing } from "src/listings/entities/listing.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    content: string
    
    @ManyToOne(
        () => User,
        user => user.comments,
        {
            eager: true,
            nullable: false,
        }
    )
    user: User
    
    @ManyToOne(
        () => Listing,
        listing => listing.comments,
        {
            eager: false,
            nullable: false,
        }
    )
    listing: Listing

 }
