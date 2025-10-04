import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { CrudService } from 'src/common/services/crud.service';
import { Listing } from 'src/listings/entities/listing.entity';
import { CreateReservationDto } from 'src/reservations/dto/create-reservation.dto';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@Injectable()
export class UsersService extends CrudService<User> {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,

    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,

  ) {
    super(userRepository);
  }

  findAll() {
    return super.findAll();
  }

  findOne(id: number) {
    return super.findOne(id);
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return super.update(id, updateUserDto);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return super.remove(user);
  }


  // ********************** liste des favoris *******************


 




  // ***************** liste des reservations *******************

  async getReservations(user: User) {
    const reservations = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.reservations', 'reservation')
      .select('reservation')
      .where('reservation.user.id=:id', { id: user.id })
      .getMany()
    return reservations;
  }

  async addReservation(user: User, listingId: number, reservation: CreateReservationDto) {
    const listing = await this.listingRepository.findOneBy({ id: listingId });
    const newReservation = this.reservationRepository.create(reservation);
    newReservation.user = user;
    newReservation.listing = listing;
    return await this.reservationRepository.save(newReservation);

  }

  // async deleteReservation(user: User, listingId: number) {
  //   console.log("deleting this ", listingId)
  //   const listing = await this.listingRepository.findOneBy({ id: listingId });
  //   user.favoris = user.favoris.filter(fav => fav.id !== listing.id);
  //   await this.userRepository.save(user);
  //   return user;
  // }


}
