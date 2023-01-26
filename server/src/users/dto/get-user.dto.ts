import { IsNotEmpty } from "class-validator";

export class GetUserDto {
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}