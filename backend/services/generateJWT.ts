import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtPassword = process.env.jwtPassword as string;

export const generateJWT = async (username:string) => {
    return jwt.sign({ username: username }, jwtPassword);
}

export const verifyJWT = async (token:string) => {
    return jwt.verify(token, jwtPassword);
}