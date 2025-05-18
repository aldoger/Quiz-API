import User from "../models/user.js";
import jwt from 'jsonwebtoken'


export const saveUser = async (req, res, next) => {

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


export const userAuthorization = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if(authHeader && authHeader.startsWith('Bearer ')){
        const token = authHeader.split(' ')[1];
    }else{
        console.log("No token found")
    }

    const result = jwt.verify(token, process.env.SECRET_KEY)
    if(result){
        next();
    }else{
        res.status(401).send({ msg: 'Unauthorized'});
    }
}
