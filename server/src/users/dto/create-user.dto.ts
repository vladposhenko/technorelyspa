import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class CreateUserDto {

    @IsEmail({}, {message: 'Некорректный email'})
    @IsNotEmpty()
    readonly email: string;

    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    @IsNotEmpty()
    readonly password: string;


    readonly phone_number: string;

    readonly last_name: string;

    readonly first_name: string;

    readonly nick_name: string;

    readonly description: string;

    readonly position: string;
}