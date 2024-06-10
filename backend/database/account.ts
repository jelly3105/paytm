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

export default {
    createAccount,
    getAccountByUserId
}