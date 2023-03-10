import {Body, Controller, Get, Post, Req, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";
import { Request } from 'express'
import {ValidationPipe} from "../pipes/validation.pipe";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    
    @Post('signin')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('signup')
    @UsePipes(ValidationPipe)
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    check(@Req() req: Request) {
        return this.authService.check(req)
    }
}
