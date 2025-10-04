import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateMessageDto {

    @IsOptional()
    conversationId: number;

    @IsOptional()
    receiverMail: string;

    @IsNotEmpty()
    message: string

}
