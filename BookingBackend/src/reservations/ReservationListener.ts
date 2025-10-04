import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { Notification } from 'src/notifications/entities/notification.entity';

@Injectable()
export class ReservationListener {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  @OnEvent('reservation.created')
  async handleReservationCreatedEvent(payload: any) {
    const { reservation, user, listing } = payload;
    const notification = this.notificationRepository.create({
      content: `Reservation ${reservation.id} for the property ${listing.title} (${listing.id}) located in ${listing.country}, scheduled from ${reservation.startDate} to ${reservation.endDate}, has been successfully confirmed.`,
      user: user,
    });
    await this.notificationRepository.save(notification);
  }
  @OnEvent('reservation.deleted')
  async handleReservationDeletedEvent(payload: any) {
    const { reservation, user, listing } = payload;
    const notification = this.notificationRepository.create({
      content:`Reservation ${reservation.id} for the property ${listing.title} (${listing.id}) located in ${listing.country}, scheduled from ${reservation.startDate} to ${reservation.endDate}, has been successfully cancelled.`,
      user: user,
    });
    await this.notificationRepository.save(notification);
  }
}
