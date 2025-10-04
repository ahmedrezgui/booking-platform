import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Query } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';


@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) { }



  @Get()
  findByCriteria(
    @Query() data
  ) {
    return this.listingsService.findByCriteria(data);
  }

  @UseGuards(JwtGuard)
  @Get('user')
  findByUser(
    @CurrentUser() user: User,
  ) {
    return this.listingsService.findByUser(user);
  }

  @UseGuards(JwtGuard)
  @Get('user/favorites')
  getFavorites(@CurrentUser() user: User) {
    return this.listingsService.getFavorites(user);
  }


  @UseGuards(JwtGuard)
  @Post('user/favorites/:listingId')
  addFav(
    @Param('listingId') listingId: number,
    @CurrentUser() user: User
  ) {
    return this.listingsService.addFavorite(user, listingId);
  }

  @UseGuards(JwtGuard)
  @Delete('user/favorites/:listingId')
  deleteFav(
    @Param('listingId') listingId: number,
    @CurrentUser() user: User
  ) {
    return this.listingsService.deleteFavorite(user, listingId);
  }



  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.listingsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() createListingDto: CreateListingDto,
    @CurrentUser() user: User
  ) {
    return this.listingsService.createListing(createListingDto, user);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(id, updateListingDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.listingsService.delete(id);
  }

}
