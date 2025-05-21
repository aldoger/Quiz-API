import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Token from "../models/token.js";
import sendingMail from "../middleware/email.js";
import { v4 as uuidv4 } from "uuid";
import Coder from "../models/user.js";


export const signUp = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;

        const data = {
            email,
            password: await bcrypt.hash(password, 5),
        };

        const coder = await Coder.create(data);

        if(coder){
            let setToken = await Token.create({
                userId: coder.id,
                token: uuidv4(),
            });

            if(setToken){
                sendingMail({
                    from: process.env.EMAIL_NAME,
                    to: email,
                    subject: "Account Verification Link",
                    text: `Welcome to kode kreasi. Please verify your email by clicking
                    this link:
                    http://localhost:5000/api/users/verify-email/${coder.id}/${setToken.token}`
                });

            }else{
                return res.status(400).send("token not created");
            }

            console.log("user", JSON.stringify(coder, null, 2));

            return res.status(201).send(coder);
        }else{
            return res.status(404).send("Details are not correct");
        }
    }catch(err){
        console.log(err);
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    try{

        const userToken = await Token.findOne({
            where: {
                userId: req.params.id,
                token: req.params.token
            },
        });
        console.log(userToken);


        if(!userToken){
            return res.status(400).send({
                msg: "Please verify your email first.",
            });
        }else{

            const coder = await Coder.findOne({ where: { id: req.params.id }});
            
            if(!coder){
                console.log(coder);
                
                return res.status(401).send({
                    msg: "We were unable to find a user for this verification. Please SignUp!"
                });
            }else if(coder.isVerified){
                return res
                    .status(200)
                    .send("User has been already verified. Please Login");
            } else{
                const updated = await coder.update(
                    { isVerified: true },
                    {
                        where: {
                            id: userToken.userId,
                        },
                    }
                );
                console.log(updated);

                if(!updated){
                    return res.status(500).send({ msg: "Account cannot be verified by server" });
                }else{
                    return res
                        .status(200)
                        .send("Your account has been successfully verified")
                }
            }
        }
    }catch(err){
        console.error(err);
    }
}

export const resendVerification = async (req: Request, res: Response) => {
    try{

        const coder = await Coder.findOne({ where: { email: req.body.email }});

        if(!coder){
            return res.status(400).send({
                msg: "Email not found",
            });
        }else{
            const id = coder?.id;
        
            let setToken = await Token.update({
                userId: coder.id,
                token: uuidv4(),
            });

            if(setToken){
                sendingMail({
                    from: process.env.EMAIL_NAME,
                    to: email,
                    subject: "Account Verification Link",
                    text: `Welcome to kode kreasi. Please verify your email by clicking
                    this link:
                    http://localhost:5000/api/users/verify-email/${id}/${setToken.token}`
                });

            }else{
                return res.status(400).send("token not created");
            }
        }

    }catch(err){
        console.error(err)
    }
}

export const logIn = async (req: Request, res: Response) => {
    try{

        const { email, password } = req.body;

        console.log(email, password);

        const coder = await Coder.findOne({ where: { email: email } });

        console.log(coder);

        if(coder){
            const isSame = await bcrypt.compare(password, coder.password);
            console.log(isSame);

            if(isSame){

                if(coder.isVerified){
                    let token = jwt.sign({ id: coder.id, email: coder.email, password: coder.password  }, process.env.SECRET_KEY, 
                        {
                            expiresIn: 1 * 24 * 60 * 60 * 1000,
                        }
                    );

                    console.log("user", JSON.stringify(coder, null, 2));
                    console.log(token);

                    return res.status(200).send({ token: `${token}`});

                }else{
                    return res.status(401).send("User not verified");
                }
            }else{
                res.status(401).send("Authentication failed");
            }
        }else{
            return res.status(401).send("Cannot find user");
        }
    }catch(err){
        console.error(err);
    }
};


export default [signUp, logIn, verifyEmail]
