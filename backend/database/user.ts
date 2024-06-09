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

export const findByUsernameAndUpdate = async (username: string, userData: UpdateUserType) => {
    let updatedUser;
    try {
        updatedUser = await User.findOneAndUpdate(
          { username },
          { $set: userData },
          { new: true }
        );
      } catch (e:any) {
        console.log(`Error while updating user : ${e}`);
        throw new Error(e);
      }
      return updatedUser;
}