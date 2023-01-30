import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UserService} from "../users/user.service";
import * as bcrypt from "bcryptjs"
import {User} from "../users/user.model";
import {JwtService} from "@nestjs/jwt";
import {GetUserDto} from "../users/dto/get-user.dto";
@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService
                ) {
    }


    async login(userDto: GetUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidateEmail = await this.userService.getUserByEmail(userDto.email)
        const candidateNickName = await this.userService.getUserByNickName(userDto.nick_name)
        if(candidateEmail) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        } else if (candidateNickName) {
            throw new HttpException('Пользователь с таким nickname уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password:hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {email: user.email,
            id: user.id,
            roles: user.roles,
            phone_number: user.phone_number,
            last_name: user.last_name,
            first_name: user.first_name,
            nick_name: user.nick_name
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: GetUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if(user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }

    async check(req: any) {
        return this.generateToken(req.user)
    }
}
