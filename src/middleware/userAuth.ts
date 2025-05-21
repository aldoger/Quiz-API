import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import jwt from 'jsonwebtoken'


export const saveUser = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        
        if(user){
            return res.status(409).json("email already exist");
        }

        next();
    }catch(err){
        console.error(err);
    }
}


export const userAuthorization = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const result = jwt.verify(token, process.env.SECRET_KEY as string);
            req.user = result; 
            next();
        } catch (err) {
            console.error("JWT Error:", err);  
            return res.status(401).send({ msg: 'Invalid token' });
        }
    } else {
        return res.status(401).send({ msg: 'Authorization header missing or malformed' });
    }
};
