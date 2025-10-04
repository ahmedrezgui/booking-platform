import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateReservationDto {

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;

    @IsNotEmpty()
    price: number;

    @IsOptional()
    paymentMethod: string;

    @IsOptional()
    status: string;

}
