import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { UserRoleEnum } from "../../enums/user-role.enum";
//test
export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    role: UserRoleEnum;

    @IsOptional()
    avatr_url: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsOptional()
    dob: Date;

    @IsOptional()
    isValid : boolean ;
}
