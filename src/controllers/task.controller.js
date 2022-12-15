import req from "express/lib/request";
import res from "express/lib/response";
import { Task } from "../models/Task.js";

export const getTask = async (req, req) => {
    //const task=await Task.findAll();
    res.send('Task o tareas')
}

export const createTask = async (res, res) => {
    const { name, done } = req.body
    const newTask = await Task({
        name,
        done
    })
    console.log('Tarea Creada');
    res.send(Task);
}