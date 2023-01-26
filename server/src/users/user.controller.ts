import {Body, Controller, Get, Post, Put, Req, UseGuards} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserService} from "./user.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Request} from "express";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users')
export class UsersController {

    constructor(private userService: UserService) {
    }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }


    @Put()
    @UseGuards(JwtAuthGuard)
    update(@Body() userDto: UpdateUserDto) {
        return this.userService.updateUser(userDto)
    }


    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }


    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }



}