import express from "express";
import projectRoutes from "./routes/projects.routes.js"
import taskRoutes from "./routes/tasks.routes.js"
import userRoutes from "./routes/users.routes.js"
import deviceRoutes from "./routes/device.routes.js"

const app = express();
app.use(express.json())
//app.use(express.json())
app.use (projectRoutes)
app.use (taskRoutes)
app.use (userRoutes)
//app.use (deviceRoute)

export default app;