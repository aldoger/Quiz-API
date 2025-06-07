import { Request, Response } from 'express'
import Score from '../models/score'
import { GetUserHighestScore, UserScoreReq, UserScoreRes } from '../dto/score.dto'
import { MyJWTPayload } from '../utils/myJWTPayload'
import { generateShortId } from "../utils/shortidgenerator"
import { Model } from 'sequelize'
import Coder from '../models/user'
 
export const updateUserScore = async (req: Request<any, any, UserScoreReq>, res: Response<any, UserScoreRes>) => {
    try{
        const user = req.user as MyJWTPayload
        
        const userScore = await Score.findOne({ where: { id_user: user.id }});

        if(!userScore){
            const newUserScore = await Score.create({ id: generateShortId(12), id_user: user.id, id_quiz: req.body.id_quiz, score: req.body.score });
            res.status(200).json({ newUserScore });
            return;
        }

        if(userScore.score < req.body.score) {
            userScore.score = req.body.score
            const result = await userScore.save();

            if(result){
                res.status(200).json({ result });
                return;
            }
            res.status(500).json({ msg: "Failed to update userscore"});
            return;
        }

        res.status(200).json({ msg: req.body.score });
        return;
        
    }catch(e: unknown){
        console.error(e);
    }
}

export const getUserHighestScore = async (req: Request<any, any, any, GetUserHighestScore>, res: Response) => {
    try{
        
        const quizId = req.query.id_quiz;

        const userHighestScore = await Score.findAll({ 
            where: { id_quiz: quizId }, 
            limit: 5, include: [
                {
                    model: Coder,
                    attributes: ['email']
                }
        ] });

        if(userHighestScore.length == 0){
            res.status(200).json({ msg: "No user completed the quiz yet"});
            return
        }

        res.status(200).json({userHighestScore});
        return;
    }catch(e: unknown){
        console.error(e)
    }
}