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
        const role = await this.roleService.getRoleByValue('USER')
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


    async updateUser(dto:UpdateUserDto, req:any) {
        if(req.user.id === dto.id) {
            const id = dto.id
            await this.userRepository.update({...dto}, {where: {id}})
            return dto
        } else {
            throw new HttpException('Нет доступа к даному пользователю', HttpStatus.FORBIDDEN)
        }
    }

    async getOneUser(id) {
        const user = await this.userRepository.findByPk(id, {include:{all:true}})
        return user
    }

    async editUserByAdmin(dto: UpdateUserDto, id:string) {
        await this.userRepository.update({...dto}, {where: {id}})
        return dto
    }
}
