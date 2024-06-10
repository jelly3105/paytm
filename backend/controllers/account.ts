import { Request, Response } from "express";
import validationSchema from "../validations/validationSchema";
import accountOperations from "../database/account";

const getBalance = async (req:Request, res:Response) => {
    try{
        // 1. validate schema
        const { success } = validationSchema.getBalanceSchema.safeParse(req.body);
        if(!success){
            return res.status(400).json({msg:"Validation failed!"})
        }

        // 2. Fetch balance of user
        const account = await accountOperations.getAccountByUserId(req.body.userId);
        if(!account) {
            return res.status(400).json({msg:"Account is not present!"})
        }
      
        return res.json({balance : account.balance})
    }catch(e) {
        return res.status(500).json({msg : "Server is doown!"})
    }
    
}

export default {
    getBalance
}