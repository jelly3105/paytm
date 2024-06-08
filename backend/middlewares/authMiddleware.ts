import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyJWT } from "../services/generateJWT";

interface CustomJwtPayload extends JwtPayload {
    username: string;
}
  
export const authMiddleware = async (req:any, res:any, next:any) => {
    // 1. Fetch token 
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({msg : "Token is not present, Authorization failed!"})
    }

    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(403).json({msg : "Token is not present, Authorization failed!"})
    }

    // 2. Verify token
    try {
        const decoded: CustomJwtPayload = await verifyJWT(token) as CustomJwtPayload;
        req.body.userName = decoded.username;
        next();
    } catch (err) {
        return res.status(403).json({});
    }
}