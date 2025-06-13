import { Request, Response } from "express"
import { AddSubjectRequest } from "../dto/subject.dto"
import Subject from "../models/subject"
import { generateShortId } from "../utils/shortidgenerator"


export const addSubject = async (req: Request<any, any, AddSubjectRequest>, res: Response) => {
    try{
        const data = {
            mata_kuliah: req.body.mata_kuliah
        }
        const newSubject = await  Subject.create({...data, id: generateShortId(10)});
        
        if(newSubject){
            res.status(200).json({ msg: "Success create subject"});
            return;
        }else{
            res.status(400).json({ msg: "Failed create subject"});
            return;
        }
    }catch(e:  unknown){
        console.error(e);
        res.status(500).json({ msg: "Internal server error" });
    }
} 

export const getAllSubject = async (req: Request, res: Response) => {
    try{

        const result = await Subject.findAll({});

        if(result){
            res.status(200).json({ result });
            return;
        }else{
            res.status(400).json({ msg: "Failed get subjects"});
            return;
        }
    }catch(e: unknown){
        console.error(e);
        res.status(500).json({ msg: "Internal server error" });
    }
}