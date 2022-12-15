import express from "express";
import projectRoutes from "./routes/projects.routes.js"

const app = express();
app.use(express.json())
//app.use(express.json())
app.use (projectRoutes)

export default app;