import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import validationSchema from "../validations/validationSchema";
import { findUserByUsername, saveUser } from "../database/user";
import { UserType } from "../helpers/types";
import { generateHashedPassword } from "../services/generateHashedPassword";


dotenv.config();
const jwtPassword = process.env.jwtPassword as string;

const signUp = async (req:Request, res:Response) => {
    try {
        // 1. Validate Input
        const { success } = validationSchema.signUpSchema.safeParse(req.body);
        if(!success){
            return res.status(400).json({"msg": "Input validation failed!"})
        }

        const {userName, password, firstName, lastName} = req.body;
        const userData: UserType = {
            username: userName,
            password: password,
            firstname: firstName,
            lastname: lastName
        }
        // 2. check if username exists
        const userExists = await findUserByUsername(userData.username);
        if(userExists) {
            return res.status(400).json({"msg": "User already exists, please login!"})
        }

        // 3. hash the password
        userData.password = await generateHashedPassword(userData.password);

        // 4. Store in db
        const user = await saveUser(userData);
        if(!user) {
            return res.status(500).json({"msg": "Server is down, please try again!"})
        }

        // 5. Create jwt
        const token = jwt.sign({ username: userData.username }, jwtPassword);
        return res.json({
            token: token,
            user: user._id
        })
    }catch(e){
        console.log(`Error in authentication.ts : ${e}`)
        return res.status(500).json({"msg": "Server is down, please try again later!"})
    }
}

const logIn = async (req:Request, res:Response) => {
    try {
        // 1. Validate Input
        const { success } = validationSchema.logInSchema.safeParse(req.body);
        if(!success){
            return res.status(400).json({"msg": "Input validation failed!"})
        }

        const {userName, password} = req.body;
        
        // 2. check if username exists
        const user = await findUserByUsername(userName);
        if(!user) {
            return res.status(400).json({"msg": "User doesn't exist, please signup!"})
        }

        // 3. compare the password
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({"msg" : "Password is incorrect!"})
        }

        // 4. Create jwt
        const token = jwt.sign({ username: userName }, jwtPassword);
        return res.json({
            token: token,
            user: user._id
        })
    }catch(e){
        console.log(`Error in authentication.ts : ${e}`)
        return res.status(500).json({"msg": "Server is down, please try again later!"})
    }
}

export default {
    signUp,
    logIn
};