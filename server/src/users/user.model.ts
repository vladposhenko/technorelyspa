import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Company} from "../companies/companies.model";

interface UserCreationAttribute {
    email: string;
    password: string;
    phone_number:string;
    last_name:string;
    first_name:string;
    nick_name:string;
}


@Table({tableName:'users'})
export class User extends Model<User,UserCreationAttribute > {
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id:number;

    @Column({type: DataType.STRING, unique:true, allowNull:false})
    email:string;

    @Column({type: DataType.STRING,  allowNull:false})
    password:string;

    @Column({type: DataType.STRING,  allowNull:false})
    phone_number:string;

    @Column({type: DataType.STRING,  allowNull:false})
    last_name:string;

    @Column({type: DataType.STRING,  allowNull:false})
    first_name:string;

    @Column({type: DataType.STRING,  allowNull:false, unique:true})
    nick_name:string;

    @Column({type: DataType.STRING})
    description:string;

    @Column({type: DataType.STRING})
    position:string;



    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Company)
    company:Company[]
}