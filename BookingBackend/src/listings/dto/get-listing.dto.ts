import { IsOptional } from "class-validator";

export class GetListingDto {

    @IsOptional()
    country: string;

    @IsOptional()
    price: number;

    @IsOptional()
    capacity: number

    @IsOptional()
    rooms: number;

    @IsOptional()
    bathrooms: number;

    @IsOptional()
    type: string;

    @IsOptional()
    isAdminContext : boolean ;


}