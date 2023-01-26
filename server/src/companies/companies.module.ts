import {forwardRef, Module} from '@nestjs/common';
import {CompaniesService} from './companies.service';
import {CompaniesController} from './companies.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Company} from "./companies.model";
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [CompaniesService],
  controllers: [CompaniesController],
  imports:[
    SequelizeModule.forFeature([User, Company]),
      FilesModule,
    forwardRef(() => AuthModule)
  ],
})
export class CompaniesModule {}
