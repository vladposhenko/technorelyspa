import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {User} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService
                ) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue('ADMIN')
        console.log(role)
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include:{all:true}})
        return users
    }

    async paginate(req: any) {
        const {page = 0, size = 6} = req.query;
        let options = {
            limit: +size,
            offset: (+page) * (+size)
        }
        const { count, rows } = await this.userRepository.findAndCountAll(options)
        return {
            total: count,
            users: rows
        }
    }

    async getUserByEmail(email:string) {
        const user = await this.userRepository.findOne({where:{email}, include:{all: true}})
        return user
    }

    async getUserByNickName(nick_name:string) {
        const user = await this.userRepository.findOne({where:{nick_name}, include:{all: true}})
        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)
        if(role && user) {
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException('Пользователь или роль не найден', HttpStatus.NOT_FOUND)
    }


    async updateUser(dto:UpdateUserDto) {
        const id = dto.id
        const updatedUser = this.userRepository.update({...dto}, {where: {id}})
        return updatedUser
    }
}