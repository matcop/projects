import express from "express";
import projectRoutes from "./routes/projects.routes.js"
import taskRoutes from "./routes/tasks.routes.js"
import userRoutes from "./routes/users.routes.js"
import deviceRoutes from "./routes/device.routes.js"
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();

const whiteList=[process.env.ORIGIN1]//registrar todos los dominios qu se realcionan con el backend
// app.use(cors()); // TODOS PUEDEN ACCEDER NUESTRO SITIO
//console.log(process.env.ORIGIN1);
//app.use(cors());
app.use(
    cors({
        origin: function (origin, callback) {
           // console.log("😲😲😲 =>", origin);
            // if (whiteList.includes(origin)) {
                if (!origin || whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback(
                "Error de CORS origin: " + origin + " No autorizado!⁜⁜⁜⁜"
            );
        },
        credentials: true,
    })
);



app.use(express.json())
app.use(cookieParser())
app.use (projectRoutes)
app.use(express.static("public"))
app.use (taskRoutes)
app.use (userRoutes)
//app.use (deviceRoute)

export default app;