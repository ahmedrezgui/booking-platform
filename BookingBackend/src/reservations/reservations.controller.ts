import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) { }

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('user')
  getReservations(@CurrentUser() user: User) {
    return this.reservationsService.getReservations(user);
  }

  @UseGuards(JwtGuard)
  @Post('user/:listingId')
  addReservation(
    @Param('listingId') listingId: number,
    @CurrentUser() user: User,
    @Body() reservation: CreateReservationDto,
  ) {
    return this.reservationsService.addReservation(user, listingId, reservation);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(
    @CurrentUser() user:User,
    @Param('id') id: number
  ) {
    return this.reservationsService.deleteReservation(id,user);
  }

}
