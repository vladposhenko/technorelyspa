import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class CreateUserDto {


    @IsNotEmpty({message: 'Email не должен быть пустым'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;


    @IsNotEmpty({message: 'Пароль не должен быть пустым'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly password: string;

    @IsNotEmpty({message: 'Номер телефона не должен быть пустым'})
    readonly phone_number: string;

    @IsNotEmpty({message: 'Фамилия не должна быть пустая'})
    readonly last_name: string;

    @IsNotEmpty({message: 'Имя не должно быть пустое'})
    readonly first_name: string;

    @IsNotEmpty({message: 'Никнейм не должен быть пустым'})
    readonly nick_name: string;

    @IsNotEmpty({message: 'Описание не должно быть пустым'})
    readonly description: string;

    @IsNotEmpty({message: 'Должность не должна быть пустой'})
    readonly position: string;
}