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
exports.getAllSubject = exports.addSubject = void 0;
const subject_1 = __importDefault(require("../models/subject"));
const shortidgenerator_1 = require("../utils/shortidgenerator");
const addSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            mata_kuliah: req.body.mata_kuliah
        };
        const newSubject = yield subject_1.default.create(Object.assign(Object.assign({}, data), { id: (0, shortidgenerator_1.generateShortId)(10) }));
        if (newSubject) {
            res.status(200).json({ msg: "Success create subject" });
            return;
        }
        else {
            res.status(400).json({ msg: "Failed create subject" });
            return;
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.addSubject = addSubject;
const getAllSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield subject_1.default.findAll({});
        if (result) {
            res.status(200).json({ result });
            return;
        }
        else {
            res.status(400).json({ msg: "Failed get subjects" });
            return;
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.getAllSubject = getAllSubject;
