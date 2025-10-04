import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Listing } from 'src/listings/entities/listing.entity';
import { ReservationListener } from './ReservationListener';
import { Notification } from 'src/notifications/entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Listing, Notification]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService,ReservationListener],
  exports: [ReservationsService]
})
export class ReservationsModule { }
