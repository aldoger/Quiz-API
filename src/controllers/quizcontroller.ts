import { Request, Response } from "express";
import { AddQuizRequest, GetQuizByIdSubject } from "../dto/quiz.dto"
import Quiz from "../models/quiz";
import { fisherYatesShuffle } from '../utils/shuffle'
import { generateShortId } from '../utils/shortidgenerator'

export const addQuiz = async (req: Request<any, any, AddQuizRequest>, res: Response) => {
    try{
        const data = {
            id: generateShortId(11),
            id_mata_kuliah: req.body.id_mata_kuliah,
            judul_soal: req.body.judul_soal,
            opsi: req.body.opsi,
            src: req.body.src ?? undefined
        }

        const newQuiz = await Quiz.create(data);
        if(newQuiz){
            res.status(200).json({ msg: "Success to create quiz"});
            return;
        }else{
            res.status(400).json({ msg: "Failed to create quiz"});
            return;
        }
    }catch(e: unknown){
        console.error(e);
    }
}

export const getQuizByIdSubject = async (req: Request<any, GetQuizByIdSubject>, res: Response) => {
    try{
        const subjectId = req.query.id_mata_kuliah

        const result = await Quiz.findAll({ where: { id_mata_kuliah: subjectId as string }});
        
        if(result.length == 0){
            res.status(200).json({ msg: "No quiz found"});
            return;
        }

        const shuffledQuiz = fisherYatesShuffle(result);
        res.status(200).json({shuffledQuiz});
        return;
    }catch(e: unknown){
        console.error(e);
    }
}