import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/user.model";

interface CompanyCreationAttribute {
    name: string;
    address:string;
    service_of_activity:string;
    number_of_employees:string;
    description:string;
    type: string;
    userId:number;
}


@Table({tableName:'companies'})
export class Company extends Model<Company,CompanyCreationAttribute > {
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id:number;

    @Column({type: DataType.STRING, unique:true, allowNull:false})
    name:string;

    @Column({type: DataType.STRING,  allowNull:false})
    address:string;

    @Column({type: DataType.STRING,  allowNull:false})
    service_of_activity:string;

    @Column({type: DataType.STRING,  allowNull:false})
    number_of_employees:string;

    @Column({type: DataType.STRING,  allowNull:false})
    description:string;

    @Column({type: DataType.STRING,  allowNull:false})
    type:string;


    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId:number;


    @BelongsTo(() => User)
    author:User

}