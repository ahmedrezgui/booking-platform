import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Listing } from 'src/listings/entities/listing.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Listing, Reservation])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
