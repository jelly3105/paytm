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

export default {
    createAccount
}