import mongoose from "mongoose";
import Account from "../models/account";

const createAccount = async (userId:string) => {
    try {
        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })
    }catch(e:any) {
        console.log(`Error while creating account : ${e}`);
        throw new Error(e);
    }
}

const getAccountByUserId = async (userId:string) => {
    let account;
    try {
        account = await Account.findOne({
            userId
        })
    }catch(e:any) {
        console.log(`Error while getting account by user id : ${e}`);
        throw new Error(e);
    }
    return account;
}

const transferMoney = async(userId: string, amount:number, to: string) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        // Check the balance
        const account = await Account.findOne({userId}).session(session);

        if(!account || account.balance < amount){
            await session.abortTransaction();
            return 'Insufficient balance';
        }

        // Validate to account
        const toAccount = await Account.findOne({userId : to}).session(session);

        if(!toAccount){
            await session.abortTransaction();
            return 'Invalid account';
        }

        // Transfer money
        await Account.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();
    }catch(e:any) {
        console.log(`Error while transferring money : ${e}`);
        throw new Error(e);
    }
}

export default {
    createAccount,
    getAccountByUserId,
    transferMoney
}