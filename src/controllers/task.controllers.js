import { where } from "sequelize";
import { Task } from "../models/Task.js"

export const getTasks = async (req, res) => {

    try {
        //throw new Error('falla en obtener el proyecto')
        const task = await Task.findAll();
        res.send(task)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findOne({
            where: {
                id: id
            }
        }
        );
        if (!task) return res.status(404).json({ message: 'proyecto no encontrado' })
        res.json(task);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const createTask = async (req, res) => {
    try {
        const { name, done, projectId } = req.body
        const newTask = await Task.create({
            name,
            done,
            projectId
        })
        console.log(newTask);
        res.send(newTask)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateTask = async (req, res) => {

    try {
        const { id } = req.params
        const { name, done } = req.body

        const task = await Task.findByPk(id);
        task.name = name,
            task.done = done,

            await task.save()
        res.json(task);


        // if(project===null){
        //     console.log('project no encontrado');
        //     return res.status(500).json({
        //         message: error.message});
        // }else{
        //     console.log(project instanceof Project);
        //     return res.status(200).json({
        //         message: error.message});
        // }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const deleteTask = async (req, res) => {
    try {
        //throw new Error('falla en borrar un proyecto')
        const { id } = req.params

        await Task.destroy({
            where: {
                id: id
            }
        })

        //console.log(req.params.id);
        //res.send('borrando proyecto ', elemento);
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}