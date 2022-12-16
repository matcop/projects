import { where } from "sequelize";
import { Project } from "../models/Project.js"
import { Task } from "../models/Task.js";

export const getProjects = async (req, res) => {

    try {
        //throw new Error('falla en obtener el proyecto')
        const projects = await Project.findAll();
        res.send(projects)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getProject = async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findOne({
            where: {
                id: id
            }
        }
        );
        if (!project) return res.status(404).json({message:'proyecto no encontrado'})
        res.json(project);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const createProject = async (req, res) => {
    try {
        const { name, priority, description } = req.body
        const newProject = await Project.create({
            name,
            priority,
            description
        })
        console.log(newProject);
        res.send(newProject)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateProject = async (req, res) => {

    try {
        const { id } = req.params
        const { name, priority, description } = req.body

        const project = await Project.findByPk(id);
        project.name = name,
            project.priority = priority,
            project.description = description
        await project.save()
        res.json(project);


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

export const deleteProject = async (req, res) => {
    try {
        //throw new Error('falla en borrar un proyecto')
        const { id } = req.params
        const elemento = id;
        await Project.destroy({
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
//----------OBTENER LAS TAREAS DE UN PROYECTO

export const getProjectTask = async (req, res) => {
 

    try {
        //throw new Error('falla en obtener el proyecto')
        const {id}=req.params
        const tasks = await Task.findAll({
            where:{projectId:id}
        });
        res.json(tasks)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
