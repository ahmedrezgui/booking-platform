import { IsNotEmpty } from "class-validator";

export class LoginCredentialsDto {

    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;

}
