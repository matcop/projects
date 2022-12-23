import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Sequelize } from "sequelize";
//import { User } from './User.js';

export const Device = sequelize.define('devices', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    ci: {
        type: DataTypes.STRING,
    },
    plataform: {
        type: DataTypes.STRING,
    },
    isPhysicalDevice: {
        type: DataTypes.STRING,
    },
    marca: {
        type: DataTypes.STRING,
    },
    modello: {
        type: DataTypes.STRING,
    }

});

// Project.hasMany(Task, {
//     foreignKey: 'projectId',
//     sourceKey: 'id'
// });

// Task.belongsTo(Project, {
//     foreignKey: 'projectId',
//     targetId: 'id'
// });

