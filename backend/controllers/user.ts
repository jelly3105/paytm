import { Request, Response } from "express";
import { findByUsernameAndUpdate } from "../database/user";
import { generateHashedPassword } from "../services/generateHashedPassword";
import validationSchema from "../validations/validationSchema";

const updateUser = async (req:Request, res:Response) => {
    try{
        // 1. Validate request
        const { success } = validationSchema.updateUserSchema.safeParse(req.body);
        if(!success) {
            return res.status(400).json({msg : "Validation failed!"})
        }

        // 2. Create input to update user
        const { userName, password, firstName, lastName } = req.body;

        if(!userName) {
            return res.status(400).json({msg : "Username is not present!"})
        }

        const userData: { [key: string]: string } = {};
        if (firstName){
            userData.firstname = firstName;
        }

        if (lastName){
            userData.lastname = lastName;
        }

        if(password) {
            userData.password = await generateHashedPassword(password);
        }

        // Ensure there's something to update
        if (Object.keys(userData).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }

        // 3. update user
        const updatedUser = await findByUsernameAndUpdate(userName, userData);
        if(!updatedUser) {
            return res.status(400).json({ message: 'User does not exist!' });
        }

        return res.json({"msg" : "User updated successfully!", user_id: updatedUser._id})
    }catch(e) {
        return res.status(500).json({msg : "Server is doown!"})
    }
}

export default {
    updateUser
}