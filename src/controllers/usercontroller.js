import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Token from "../models/token.js";
import sendingMail from "../middleware/email.js";
import { v6 as uuidv6 } from "uuid";
import User from "../models/user.js";


export const Signup = async (req, res) => {
    try{
        const { email, password } = req.body;

        const data = {
            email,
            password: await bcrypt.hash(password, 5),
        };

        const user = await User.create(data);

        if(user){
            let setToken = await Token.create({
                userId: user.id,
                token: uuidv6(),
            });

            if(setToken){
                sendingMail({
                    from: process.env.EMAIL_NAME,
                    to: email,
                    subject: "Account Verification Link",
                    text: `Welcome to kode kreasi. Please verify your email by clicking
                    this link:
                    http://localhost:5000/api/users/verify-email/${user.id}/${setToken.token}`
                });

            }else{
                return res.status(400).send("token not created");
            }

            console.log("user", JSON.stringify(user, null, 2));

            return res.status(201).send(user);
        }else{
            return res.status(404).send("Details are not correct");
        }
    }catch(err){
        console.log(err);
    }
};

export const verifyEmail = async (req, res) => {
    try{

        const token = req.params.token;

        const userToken = await Token.findOne({
            where: {
                userId: req.params.id
            },
        });
        console.log(userToken);

        if(!userToken){
            return res.status(400).send({
                msg: "Your verification link may have expired. Please click on resend for verify your Email.",
            });
        }else{

            const user = await User.findOne({ where: { id: req.params.id }});
            
            if(!user){
                console.log(user);
                
                return res.status(401).send({
                    msg: "We were unable to find a user for this verification. Please SignUp!"
                });
            }else if(user.isVerified){
                return res
                    .status(200)
                    .send("User has been already verified. Please Login");
            } else{

            }
        }
    }catch(err){

    }
}

export const Login = async (req, res) => {
    const { id } = req.body;
   
    const UserIndex = user.findIndex(u => u.id == id); 

    if (UserIndex === -1) {  
        return res.status(403).json({ error: "Request denied" });
    }

    const token = GenerateToken(user[UserIndex].username); 

    res.setHeader("Content-Type", "application/json");
    res.status(202).json({ token });
};
