import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { UserModule } from "./users/user.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/user.model";
import {UsersController} from "./users/user.controller";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import {Company} from "./companies/companies.model";
import { FilesModule } from './files/files.module';
import {ApiTokenCheckMiddleware} from "./middleware/auth.middleware";


@Module({
  imports: [UserModule,
      ConfigModule.forRoot({
        envFilePath:  `.${process.env.NODE_ENV}.env`
      }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Company],
      autoLoadModels:true
    }),
    RolesModule,
    AuthModule,
    CompaniesModule,
    FilesModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
