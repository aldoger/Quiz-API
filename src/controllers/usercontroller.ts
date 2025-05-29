import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Token from "../models/token.js";
import sendingMail from "../middleware/email.js";
import { v4 as uuidv4 } from "uuid";
import Coder from "../models/user.js";
import { Request, Response } from "express";
import { UserAuthRequest, UserResendRequest } from "../dto/userAuth.dto"
import { generateShortId } from "../utils/shortidgenerator"

export const signUp = async (req: Request<any, any, UserAuthRequest>, res: Response) => {
    try{
        const { email, password } = req.body;

        const data = {
            email,
            password: await bcrypt.hash(password, 5),
        };

        const coder = await Coder.create({...data, id: generateShortId(8)});

        if(coder){
            let setToken = await Token.create({
                userId: coder.id,
                token: uuidv4(),
            });

            if(setToken){
                sendingMail({
                    from: process.env.EMAIL_NAME as string,
                    to: email,
                    subject: "Account Verification Link",
                    text: `Welcome to kode kreasi. Please verify your email by clicking
                    this link:
                    http://localhost:5000/api/users/verify-email/${coder.id}/${setToken.token}`
                });

            }else{
                res.status(400).send("token not created");
                return;
            }

            console.log("user", JSON.stringify(coder, null, 2));

            res.status(201).send(coder);
            return;
        }else{
            res.status(404).send("Details are not correct");
            return;
        }
    }catch(e: unknown){
        console.log(e);
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
            res.status(400).send({
                msg: "Please verify your email first.",
            });
            return;
        }else{

            const coder = await Coder.findOne({ where: { id: req.params.id }});
            
            if(!coder){
                console.log(coder);
                
                res.status(401).send({
                    msg: "We were unable to find a user for this verification. Please SignUp!"
                });
                return;
            }else if(coder.isVerified){
                 res
                    .status(200)
                    .send("User has been already verified. Please Login");
                return;
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
                    res.status(500).send({ msg: "Account cannot be verified by server" });
                    return;
                }else{
                    res
                        .status(200)
                        .send("Your account has been successfully verified");
                    return;
                }
            }
        }
    }catch(e: unknown){
        console.error(e);
    }
}

export const resendVerification = async (req: Request<any, any, UserResendRequest>, res: Response) => {
    try{

        const coder = await Coder.findOne({ where: { email: req.body.email }});

        if(!coder){
            res.status(400).send({
                msg: "Email not found",
            });
            return;
        }else{
            const id = coder?.id;
            const newToken = uuidv4();
                let setToken = await Token.update({
                    token: newToken,
                }, {
                    where: { userId: id}
                });

            if(setToken){
                sendingMail({
                    from: process.env.EMAIL_NAME as string,
                    to: req.body.email,
                    subject: "Account Verification Link",
                    text: `Welcome to kode kreasi. Please verify your email by clicking
                    this link:
                    http://localhost:5000/api/users/verify-email/${id}/${newToken}`
                });

            }else{
                res.status(400).send("token not created");
                return;
            }
        }

    }catch(e: unknown){
        console.error(e)
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
                    let token = jwt.sign({ id: coder.id, email: coder.email, password: coder.password  }, process.env.SECRET_KEY as string, 
                        {
                            expiresIn: 1 * 24 * 60 * 60 * 1000,
                        }
                    );

                    console.log("user", JSON.stringify(coder, null, 2));
                    console.log(token);

                    res.status(200).send({ token: `${token}`});
                    return;
                }else{
                    res.status(401).send("User not verified");
                    return;
                }
            }else{
                res.status(401).send("Authentication failed");
                return;
            }
        }else{
            res.status(401).send("Cannot find user");
            return;
        }
    }catch(e: unknown){
        console.error(e);
    }
};


export default [signUp, logIn, verifyEmail]
