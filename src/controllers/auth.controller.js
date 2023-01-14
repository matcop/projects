import { User } from '../models/User.js'
import { Device } from '../models/Device.js'
import { generateToken } from '../utils/tokenManager.js'
import { Op, and } from "sequelize";
import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { ci, comp, fullname, username, email, password, plataform, isPhysicalDevice, marca, modello } = req.body;
    try {
        // Alternativa buscando por email
        let e_mail = await User.findOne({ where: { email: email } });
        let e_ci = await User.findOne({ where: { ci: ci } });

        if (e_ci != null) { //SI YA EXISTE EL CI SE SALE
            throw { code: 11000 };
        };
        if (e_mail != null) { //SI YA EXISTE EL EMAIL SE SALE
            throw { code: 12000 };
        }

        const salt = await bcrypt.genSalt(10);
        const user_password = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            ci, comp, fullname, username, email,
            password: user_password,
            estado: false
        });
        const newDevice = await Device.create({ ci, plataform, isPhysicalDevice, marca, modello });
        return res.json({ newUser, newDevice })

    } catch (error) {
        console.log(error);
        // Alternativa de error
        if (error.code === 11000) {
            return res.status(400).json({ error: "Ya existe ci" });
        }
        if (error.code === 12000) {
            return res.status(400).json({ error: "Ya existe email " });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const user = await User.findOne({ where: { email: email } });//USAR EN FINDONE ACORDE A DOCUMENTACION
        console.log(user.password);
        if (!user)
            return res.status(403).json({ error: "No existe este usuario" });
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            //login
            const { token, expireIn } = generateToken(user.id)
            // generateRefreshToken(user.id, res)

            console.log('LA CONTRASE;A COINCIDE COMPLETAMENTE');



            // console.log(generateToken(user.id));
            console.log(token);
            // res.send('Cookie is set');
            // return res.json({ token, expireIn });///esto fue lo que cambiamos

            //MODELADO DE LA RESPUESTA DEL SERVIDOR DESDE AQUI PARA ABAJO POR VERDADERO Y FALSO.
            //puede ir cualquier dato del usuario.
            const data = {
                id: user.id,
                Nombre_Completo: user.fullname,
                email: user.email,
                //phone: " borrar",
                //image: " borrar",
                session_token: token,
                expireEn:expireIn 
            }
            console.log(data);
            //EL OBJETO ANTERIOR DE NOMBRE DATA SE MUESTRA CON EL SIGUIENTE FORMATO
            return res.status(201).json({
                success: true,
                message: 'Usuario autenticado',
                data: data
            });

            //return res.status(200).json({message:"correcto"})
        } else {
            return res.status(403).json({ 
                success:false,
                message:" Mensaje Contraseña incorrecta",
                error: "Contraseña incorrecta" });
        }


        //GENERAR TOKEN
        //  const { token, expireIn } = generateToken(user.id)
        // // console.log(generateToken(user.id));

        //  return res.json({ token, expireIn });


        //const respuestaPassword = await user.comparePassword(password);
        // if (!respuestaPassword)
        //     return res.status(403).json({ error: "Contraseña incorrecta" });
        //return res.status(403).json({ error: "Contraseña incorrecta" });


        // Generar el token JWT
        // const { token, expiresIn } = generateToken(user.id);
        //generateRefreshToken(user.id, res);


        //return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};


export const infoUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.id)
        //return res.json({user})
        return res.json({ email: user.email, uuid: user.id, ci: user.ci })
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: error.message });
    }

}

