import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateCompanyDto} from "./dto/create-company.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Company} from "./companies.model";
import {FilesService} from "../files/files.service";
import {UpdateCompanyDto} from "./dto/update-company.dto";

@Injectable()
export class CompaniesService {

    constructor(@InjectModel(Company) private companyRepository: typeof Company,
                private filesService: FilesService) {}


    async createCompany(dto: CreateCompanyDto, req:any) {
        const userId = req.user.id
        const name = dto.name
        const isExist = await this.companyRepository.findOne({where:{name}})
        if(isExist) {
            throw new HttpException('Компания с таким именем уже существует', HttpStatus.CONFLICT)
        }
        const company = await this.companyRepository.create({...dto, userId})
        return company
    }

    async getMyCompanies(req:any) {
        const userId = req.user.id
        const companies = await this.companyRepository.findAll({where: {userId}})
        return companies
    }

    async getCompanyByName(name: string) {
        const company = await this.companyRepository.findOne({where: {name}})
        return company
    }

    async updateCompany(dto: UpdateCompanyDto, req:any) {
        const userId = req.user.id
        const id = dto.id
        const name = dto.name
        const isExist = await this.companyRepository.findOne({where:{name}})
        if(isExist) {
            throw new HttpException('Компания с таким именем уже существует', HttpStatus.CONFLICT)
        }
        const updatedCompany = await this.companyRepository.update({...dto}, {where: {id, userId}})
        if(updatedCompany) return  updatedCompany
        return new HttpException('You can update only your company', HttpStatus.FORBIDDEN)
    }

    async getAllCompanies() {
        const companies = await this.companyRepository.findAll({include:{all:true}})
        return companies
    }

    async paginate(req: any) {
        const {page = 0, size = 6} = req.query;
        let options = {
            limit: +size,
            offset: (+page) * (+size)
        }
        const { count, rows } = await this.companyRepository.findAndCountAll(options)
        return {
            total: count,
            companies: rows
        }
    }

    async deleteMyCompany(id, req:any) {
        const userId = req.user.id
        const deletedCompany =  await this.companyRepository.destroy({
            where:{
                userId,
                id
            }
        })
        if(deletedCompany) return  "Deleted Successfully"
        return new HttpException('Cant delete this company', HttpStatus.BAD_REQUEST)
    }

    async getOneCompanyAdmin(name) {
        const company = await this.companyRepository.findOne({where: {name}})
        return company
    }

}
