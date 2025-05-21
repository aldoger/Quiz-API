import { quizDasprog, quizSisdig, quizPPL, quizAlin, quizStrukdat } from "../models/quiz.js";

function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

export const GetQuizDasprog = (req, res) => {
    const Quiz = fisherYatesShuffle([...quizDasprog]);
    res.status(200).json(Quiz);
}

export const GetQuizSisdig = (req, res) => {
    const Quiz = fisherYatesShuffle([...quizSisdig]);
    res.status(200).json(Quiz);
}

export const GetQuizPPL = (req, res) => {
    const Quiz = fisherYatesShuffle([...quizPPL]);
    res.status(200).json(Quiz);
}

export const GetQuizAlin = (req, res) => {
    const Quiz = fisherYatesShuffle([...quizAlin]);
    res.status(200).json(Quiz);
}

export const GetQuizStrukdat = (req, res) => {
    const Quiz = fisherYatesShuffle([...quizStrukdat]);
    res.status(200).json(Quiz);
}

