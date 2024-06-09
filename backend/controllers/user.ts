import { Request, Response } from "express";
import { fetchUsersByFirstnameOrLastname, findByUserIdAndUpdate } from "../database/user";
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
        const { id, userData } = req.body;
        const { password } = userData;

        if(password) {
            userData.password = await generateHashedPassword(password);
        }

        // Ensure there's something to update
        if (Object.keys(userData).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }

        // 3. update user
        const updateResult = await findByUserIdAndUpdate(id, userData);
        if(!updateResult.modifiedCount) {
            return res.status(400).json({ message: 'User does not exist!' });
        }

        return res.json({"msg" : "User updated successfully!", user_id: id})
    }catch(e) {
        return res.status(500).json({msg : "Server is doown!"})
    }
}

const getUsers = async (req:Request, res:Response) => {
    try{
        // 1. Fetch query parameter and validate it.
        const { filter } = req.query;
        console.log(filter)
        if(!filter){
            return res.status(400).json({ message: 'Filter is not present!' });
        }

        // 2. Fetch users from database
        const searchCriteria = [{
            firstname: {
                $regex: filter,
                $options: 'i'
            }
        }, {
            lastname: {
                $regex: filter,
                $options: 'i'
            }
        }];

        const users = await fetchUsersByFirstnameOrLastname(searchCriteria);
        console.log(users);

        return res.json({users: users.map(user => {
            return {
                _id: user._id,
                userName: user.username,
                firstName: user.firstname,
                lastName: user.lastname
            }
        })})
    }catch(e) {
        return res.status(500).json({msg : "Server is doown!"})
    }
}

export default {
    updateUser,
    getUsers
}