"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHighestScore = exports.updateUserScore = void 0;
const score_1 = __importDefault(require("../models/score"));
const shortidgenerator_1 = require("../utils/shortidgenerator");
const user_1 = __importDefault(require("../models/user"));
const updateUserScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userScore = yield score_1.default.findOne({ where: { id_user: user.id } });
        if (!userScore) {
            const newUserScore = yield score_1.default.create({ id: (0, shortidgenerator_1.generateShortId)(12), id_user: user.id, id_quiz: req.body.id_quiz, score: req.body.score });
            res.status(200).json({ newUserScore });
            return;
        }
        if (userScore.score < req.body.score) {
            userScore.score = req.body.score;
            const result = yield userScore.save();
            if (result) {
                res.status(200).json({ result });
                return;
            }
            res.status(500).json({ msg: "Failed to update userscore" });
            return;
        }
        res.status(200).json({ msg: req.body.score });
        return;
    }
    catch (e) {
        console.error(e);
    }
});
exports.updateUserScore = updateUserScore;
const getUserHighestScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = req.query.id_quiz;
        const userHighestScore = yield score_1.default.findAll({
            where: { id_quiz: quizId },
            limit: 5, include: [
                {
                    model: user_1.default,
                    attributes: ['email']
                }
            ]
        });
        if (userHighestScore.length == 0) {
            res.status(200).json({ msg: "No user completed the quiz yet" });
            return;
        }
        res.status(200).json({ userHighestScore });
        return;
    }
    catch (e) {
        console.error(e);
    }
});
exports.getUserHighestScore = getUserHighestScore;
