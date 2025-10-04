import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Listing } from 'src/listings/entities/listing.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,

    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  create(createReservationDto: CreateReservationDto) {
    return 'This action adds a new reservation';
  }

  findAll() {
    return `This action returns all reservations`;
  }

  async getReservations(user: User) {
    const reservations = await this.reservationRepository.find({
      where: { user: user },
    });
    return reservations;
  }

  async addReservation(
    user: User,
    listingId: number,
    reservation: CreateReservationDto,
  ) {
    const listing = await this.listingRepository.findOneBy({ id: listingId });
    const newReservation = this.reservationRepository.create(reservation);
    newReservation.user = user;
    newReservation.listing = listing;
    const save_reservation =
      await this.reservationRepository.save(newReservation);
    this.eventEmitter.emit('reservation.created', {
      reservation: save_reservation,
      user: user,
      listing: listing,
    });
    return save_reservation;
  }

  async deleteReservation(id: number, user: User) {
    const res = await this.reservationRepository.findOne({
      where: { id, user },
    });
    const deleted_resv = await this.reservationRepository.delete(id);
    this.eventEmitter.emit('reservation.deleted', {
      reservation: res,
      user: user,
      listing: res.listing,
    });
    return deleted_resv;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
