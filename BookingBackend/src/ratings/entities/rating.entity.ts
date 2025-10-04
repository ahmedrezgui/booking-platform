import { Listing } from "src/listings/entities/listing.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    value: number

    @ManyToOne(
        () => User,
        (user) => user.ratings,
        {
            eager: false,
            nullable: false,
        }
    )
    user: User

    @ManyToOne(
        () => Listing,
        listing => listing.ratings,
        {
            nullable: false,
            eager: true
        }

    )
    listing: Listing
}
