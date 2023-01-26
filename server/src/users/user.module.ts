import { UserService } from './user.service'
import {forwardRef, Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Company} from "../companies/companies.model";

@Module({
    providers: [UserService],
    exports: [UserService],
    imports:[
        SequelizeModule.forFeature([User, Role, UserRoles, Company]),
        RolesModule,
        forwardRef(() => AuthModule)
    ],
})

export class UserModule {}