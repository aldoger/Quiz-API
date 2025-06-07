
export interface UserScoreReq {
    score: number
    id_quiz: string
}

export interface UserScoreRes {
    score: number
    id_quiz: string,
}

export interface GetUserHighestScore {
    id_quiz: string
}