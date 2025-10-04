import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing } from './entities/listing.entity';
import { CrudService } from 'src/common/services/crud.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { GetListingDto } from './dto/get-listing.dto';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@Injectable()
export class ListingsService extends CrudService<Listing> {

  constructor(
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,

    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,


  ) {
    super(listingRepository)
  }


  createListing(createListingDto: CreateListingDto, user: User) {
    const newListing = this.listingRepository.create(createListingDto);
    newListing.host = user;
    return super.create(newListing);
  }


  findByCriteria(criteria): Promise<Listing[]> {
    let qb = this.listingRepository.createQueryBuilder('listing');
    if (criteria.startDate && criteria.endDate) {
      qb.leftJoinAndSelect("listing.reservations", "reservation")
        .andWhere(`NOT (
          reservation.endDate >= :startDate AND reservation.startDate <= :endDate
          OR
          reservation.startDate <= :endDate AND reservation.endDate >= :startDate
        )`
          , { startDate: criteria.startDate, endDate: criteria.endDate })
        .orWhere("reservation.id IS NULL")

    }
    if (criteria.country) {
      qb.andWhere("listing.country= :country", { country: criteria.country })
    }
    if (criteria.price) {
      qb.andWhere("listing.price <= :price", { price: criteria.price })
    }
    if (criteria.capacity) {
      qb.andWhere("listing.capacity >= :capacity", { capacity: criteria.capacity })
    }
    if (criteria.rooms) {
      qb.andWhere("listing.rooms >= :rooms", { rooms: criteria.rooms })
    }
    if (criteria.bathrooms) {
      qb.andWhere("listing.bathrooms >= :bathrooms", { bathrooms: criteria.bathrooms })
    }
    if (criteria.type) {
      qb.andWhere("listing.type = :type", { type: criteria.type })
    }
    if(!criteria.isAdminContext || criteria.isAdminContext == false){
      qb.andWhere("listing.isValid = true")
    }
    return qb.getMany();
  }

  async findByUser(user: User): Promise<Listing[]> {
    return this.listingRepository.find({ where: { host: { id: user.id } } });
  }

  async getFavorites(user: User) {
    const favorites = await this.listingRepository.createQueryBuilder('listing')
      .leftJoinAndSelect('listing.users', 'user')
      .where('user.id = :id', { id: user.id })
      .getMany();
    return favorites;
  }

  async addFavorite(user: User, listingId: number) {
    const listing = await this.listingRepository.findOneBy({ id: listingId });
    listing.users = [...listing.users, user];
    return await this.listingRepository.save(listing);
  }

  async deleteFavorite(user: User, listingId: number) {
    const listing = await this.listingRepository.findOneBy({ id: listingId });
    listing.users = listing.users.filter(u => u.id != user.id);
    return await this.listingRepository.save(listing);
  }

  findOne(id: number) {
    return super.findOne(id);
  }

  update(id: number, updateListingDto: UpdateListingDto) {
    return super.update(id, updateListingDto);
  }

  async delete(id: number) {
    const listing = await this.listingRepository.findOneBy({ id });
    this.reservationRepository.delete({ listing: { id: listing.id } });
    return super.remove(listing);
  }
}
