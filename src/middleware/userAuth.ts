import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import jwt from 'jsonwebtoken'
import { MyJWTPayload } from "../utils/myJWTPayload";

export const saveUser = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        
        if(user){
            res.status(409).json("email already exist");
            return;
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
            req.user = result as MyJWTPayload; 
            next();
        } catch (err) {
            console.error("JWT Error:", err);  
            res.status(401).send({ msg: 'Invalid token' });
            return;
        }
    } else {
        res.status(401).send({ msg: 'Authorization header missing or malformed' });
        return;
    }
};

export const allowAdmin = (req: Request, res: Response, next: NextFunction) => {
    const admin = req.user as MyJWTPayload

    if(admin.email != "nainggolanben12@gmail.com"){
        res.status(403).json({msg: "Forbidden"});
        return;
    };

    next();
}
