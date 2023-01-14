import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' });
import jwt from "jsonwebtoken"



export const generateToken = (uuid) => {
    const expiresIn = 60 * 15;
    console.log(uuid);
    try {
        const token = jwt.sign({ uuid }, process.env.JWT_SECRET, { expiresIn });
        return { token, expiresIn }

    } catch (error) {
        console.log(error);
    }
}

