import { Sequelize } from "sequelize";

export const sequelize=new Sequelize('ingresodb','postgres','123456',{
     host: 'localhost',
     dialect: 'postgres',

})