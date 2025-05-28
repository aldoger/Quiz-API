import { Opsi } from "../models/quiz";

export interface AddQuizRequest {
    judul_soal: string,
    opsi: Opsi[]
}