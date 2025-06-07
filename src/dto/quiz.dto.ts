import { Opsi } from "../models/quiz";

export interface AddQuizRequest {
    id_mata_kuliah: string,
    judul_soal: string,
    opsi: Opsi[]
    src?: string
}

export interface GetQuizByIdSubject {
    id_mata_kuliah: string
}

