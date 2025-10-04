import { TimestampEntities } from "src/common/entities/timestamp.entity";
import { ReservationsStatusEnum, PaymentMethodEnum } from "src/enums/reservations.enum";
import { Listing } from "src/listings/entities/listing.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Reservation extends TimestampEntities {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    price: number;

    @Column({
        type: 'enum',
        enum: PaymentMethodEnum,
        default: PaymentMethodEnum.CASH
    })
    paymentMethod: string;

    @Column({
        type: 'enum',
        enum: ReservationsStatusEnum,
        default: ReservationsStatusEnum.PENDING
    })
    status: string;

    @ManyToOne(
        () => User,
        user => user.reservations,
        {

            nullable: false,

        }

    )
    user: User;

    @ManyToOne(
        () => Listing,
        listing => listing.reservations,
        {
            nullable: false,
            eager: true,
        }
    )
    listing: Listing;


}
