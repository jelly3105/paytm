import { UserType, UpdateUserType } from "../helpers/types";
import User from "../models/user";

export const findUserByUsername = async (username: string) => {
    let user;
    try {
        user = await User.findOne({username})
    }catch(e:any){
        console.log(`Error while fetching user by username : ${e}`);
        throw new Error(e);
    }
    return user;
}

export const saveUser = async (userData: UserType) => {
    let user;
    try {
        user = new User(userData);
        await user.save();
    }catch(e:any){
        console.log(`Error while saving user : ${e}`);
        throw new Error(e);
    }
    return user;
}

export const findByUserIdAndUpdate = async (id: string, userData: UpdateUserType) => {
    let updateResult;
    try {
        updateResult = await User.updateOne({ _id: id }, userData);
    } catch (e:any) {
        console.log(`Error while updating user : ${e}`);
        throw new Error(e);
    }
    return updateResult;
}

export const fetchUsersByFirstnameOrLastname = async (searchCriteria: any) => {
    let users;
    try {
        users = await User.find({
            $or: [...searchCriteria]
        });
    } catch (e:any) {
        console.log(`Error while fetching user by firstname or lastname: ${e}`);
        throw new Error(e);
    }
    return users;
}