import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Sequelize } from "sequelize";
//import { User } from './User.js';

export const User = sequelize.define('users', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    ci: {
        type: DataTypes.STRING,
    },
    comp: {
        type: DataTypes.STRING,
    },
    fullname: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
    },

});

// Project.hasMany(Task, {
//     foreignKey: 'projectId',
//     sourceKey: 'id'
// });

// Task.belongsTo(Project, {
//     foreignKey: 'projectId',
//     targetId: 'id'
// });

