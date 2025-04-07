import User from "../models/user";


export const saveUser = async (req, res, next) => {

    try{
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        
        if(user){
            return res.json(409).send("email already exist");
        }

        next();
    }catch(err){
        console.error(err);
    }
}

