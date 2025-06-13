
export interface UserScoreReq {
    score: number
    id_subject: string
}

export interface UserScoreRes {
    score: number
    id_subject: string,
}

export interface GetUserHighestScore {
    id_subject: string
}