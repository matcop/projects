import { Router } from "express";


import{register, login, infoUser} from "../controllers/auth.controller.js"
import { requiereToken } from "../middlewares/requiereToken.js";
const router = Router();


router.post('/register', register);
router.post('/login', login);

// se debe crear un midleware y su carpeta del mismo nombre
router.get('/protected',requiereToken,infoUser);


export default router;