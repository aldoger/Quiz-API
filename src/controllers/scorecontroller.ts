import { Request, Response } from 'express'
import Score from '../models/score'
import { GetUserHighestScore, UserScoreReq, UserScoreRes } from '../dto/score.dto'
import { MyJWTPayload } from '../utils/myJWTPayload'
import { generateShortId } from "../utils/shortidgenerator"
import Coder from '../models/user'

interface UserHighScoreData {
    email: string,
    score: number
}
 
export const updateUserScore = async (req: Request<any, any, UserScoreReq>, res: Response<any, UserScoreRes>) => {
    try{

        if(req.body.id_subject == null || req.body.id_subject == "") {
            res.status(400).json({ msg: "missing id subject"})
            return;
        }

        const user = req.user as MyJWTPayload
        
        const userScore = await Score.findOne({ where: { id_user: user.id }});
        

        if(!userScore){
            const newUserScore = await Score.create({ id: generateShortId(12), id_user: user.id, id_subject: req.body.id_subject, score: req.body.score });
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
        res.status(500).json({ msg: "Internal server error" });
    }
}

export const getUserHighestScore = async (req: Request<any, any, any, GetUserHighestScore>, res: Response) => {
    try{
        
        const quizId = req.query.id_subject;

        if(!quizId){
            res.status(400).json({ msg: "missing id subject"});
            return;
        }

        var userData: UserHighScoreData[] = [];

        const userHighestScore = await Score.findAll({ 
            where: { id_subject: quizId }, 
            attributes: ['id_user', 'score'],
            order: [['score', 'DESC']],
            limit: 5,
            }
        );

        if(userHighestScore.length == 0){
            res.status(200).json({ msg: "No user completed the quiz yet"});
            return
        }

        for (const scoreEntry of userHighestScore) {
            const coder = await Coder.findOne({
                where: { id: scoreEntry.id_user },
                attributes: ['email']
            });

            if (coder) {
                userData.push({
                email: coder.email,
                score: scoreEntry.score
                });
            }
        }

        res.status(200).json({ userData });
        return;
    }catch(e: unknown){
        console.error(e);
        res.status(500).json({ msg: "Internal server error" });
    }
}