import User from "../models/user.js";


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

