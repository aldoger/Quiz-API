//TODO add shuffle logic
import { Request, Response } from "express";
import { AddQuizRequest, GetQuizByIdSubject } from "../dto/quiz.dto"
import Quiz from "../models/quiz";

export const addQuiz = async (req: Request<any, any, AddQuizRequest>, res: Response) => {
    try{
        const data = {
            id_mata_kuliah: req.body.id_mata_kuliah,
            judul_soal: req.body.judul_soal,
            opsi: req.body.opsi
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

export const getQuizByIdSubject = async (req: Request<GetQuizByIdSubject>, res: Response) => {
    try{
        const subjectId = req.params.id_mata_kuliah

        const result = await Quiz.findAll({ where: { id_mata_kuliah: subjectId }});
        if(result.length > 0){
            res.status(200).json(result);
            return;
        }else{
            res.status(200).json({});
            return;
        }
    }catch(e: unknown){
        console.error(e);
    }
}