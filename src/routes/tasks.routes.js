import { Router } from "express";
//import { getProjects, createProject, updateProject, deleteProject, getProject, } from "../controllers/projects.controller.js";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/task.controllers.js";
const router = Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask)
router.delete('/tasks/:id', deleteTask)
router.get('/tasks/:id', getTask)

export default router;