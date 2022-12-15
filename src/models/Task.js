import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
// esto es para el index donde se executa import '../models/Task.js'

// se define un nuevo esquema
export const Task = sequelize.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { type: DataTypes.STRING },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

