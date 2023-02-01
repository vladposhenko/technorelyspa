import {Body, Controller, Get, Param, Post, Put, Req, UseGuards, UsePipes} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserService} from "./user.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Request} from "express";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@Controller('users')
export class UsersController {

    constructor(private userService: UserService) {
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }


    @Put()
    @UseGuards(JwtAuthGuard)
    update(@Body() userDto: UpdateUserDto, @Req() req: Request) {
        return this.userService.updateUser(userDto, req)
    }


    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/admin/:id')
    editUserByAdmin(@Body() userDto: UpdateUserDto,
                    @Param('id') id:string
                    ) {
        return this.userService.editUserByAdmin(userDto, id)
    }


    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    paginate(@Req() req: Request) {
        return this.userService.paginate(req)
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    getOneUser(@Param('id') id:string) {
        return this.userService.getOneUser(id)
    }


    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }



}