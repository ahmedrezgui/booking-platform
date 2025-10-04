import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateListingDto {

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    capacity: number

    @IsNotEmpty()
    rooms: number;

    @IsNotEmpty()
    bathrooms: number;

    @IsNotEmpty()
    type: string

    @IsNotEmpty()
    title: String;

    @IsNotEmpty()
    description: String;

    @IsNotEmpty()
    image_url: String;

    @IsOptional()
    isValid: boolean;

}
