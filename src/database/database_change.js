import { Sequelize } from "sequelize";

export const sequelize=new Sequelize('NOMBRE DE LA BD','USUARIO Q GRAL. ES POSGRES','PASSWORD',{
     host: 'IP - LOCALHOST',
     dialect: 'postgres',

})