import {Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreateCompanyDto} from "./dto/create-company.dto";
import {CompaniesService} from "./companies.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";
import {UpdateCompanyDto} from "./dto/update-company.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('companies')
export class CompaniesController {
    constructor(private companiesService: CompaniesService,
                private jwtService: JwtService,
    ) {
    }

    @Get()
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.companiesService.getAllCompanies()
    }

    @Get('/my')
    @UseGuards(JwtAuthGuard)
    getMyCompanies(@Req() req: Request) {
        return this.companiesService.getMyCompanies(req)
    }

    @Get('/:value')
    @UseGuards(JwtAuthGuard)
    getCompanyByName(@Param('value') value:string) {
        return this.companiesService.getCompanyByName(value)
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    updateCompany(@Body() dto: UpdateCompanyDto) {
        return this.companiesService.updateCompany(dto)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createCompany(@Body() dto: CreateCompanyDto,
                  @Req() req: Request
                  ) {
        return this.companiesService.createCompany(dto, req)
    }
}
