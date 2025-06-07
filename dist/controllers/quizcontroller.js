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
exports.getQuizByIdSubject = exports.addQuiz = void 0;
const quiz_1 = __importDefault(require("../models/quiz"));
const shuffle_1 = require("../utils/shuffle");
const shortidgenerator_1 = require("../utils/shortidgenerator");
const addQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = {
            id: (0, shortidgenerator_1.generateShortId)(11),
            id_mata_kuliah: req.body.id_mata_kuliah,
            judul_soal: req.body.judul_soal,
            opsi: req.body.opsi,
            src: (_a = req.body.src) !== null && _a !== void 0 ? _a : undefined
        };
        const newQuiz = yield quiz_1.default.create(data);
        if (newQuiz) {
            res.status(200).json({ msg: "Success to create quiz" });
            return;
        }
        else {
            res.status(400).json({ msg: "Failed to create quiz" });
            return;
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.addQuiz = addQuiz;
const getQuizByIdSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjectId = req.query.id_mata_kuliah;
        const result = yield quiz_1.default.findAll({ where: { id_mata_kuliah: subjectId } });
        if (result.length == 0) {
            res.status(200).json({ msg: "No quiz found" });
            return;
        }
        const shuffledQuiz = (0, shuffle_1.fisherYatesShuffle)(result);
        res.status(200).json({ shuffledQuiz });
        return;
    }
    catch (e) {
        console.error(e);
    }
});
exports.getQuizByIdSubject = getQuizByIdSubject;
