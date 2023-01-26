import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";
import { Request } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    
    @Post('signin')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('signup')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    check(@Req() req: Request) {
        return this.authService.check(req)
    }
}
