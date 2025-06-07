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
exports.SeedSubject = void 0;
const subject_1 = __importDefault(require("../models/subject"));
const shortidgenerator_1 = require("../utils/shortidgenerator");
const SeedSubject = () => __awaiter(void 0, void 0, void 0, function* () {
    console.info("Seeding subject...");
    const subjectData = [
        {
            id: (0, shortidgenerator_1.generateShortId)(6),
            mata_kuliah: "Dasar Pemrograman",
            src: "/photos/images/dasprog/dasprog.png",
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(6),
            mata_kuliah: "Pengembangan Perangkat Lunak",
            src: "/photos/images/ppl/SDLC.png"
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(6),
            mata_kuliah: "Sistem Digital",
            src: "/photos/images/sisdig/sisdig.png"
        }
    ];
    try {
        const count = yield subject_1.default.findAll();
        if (count.length > 0) {
            console.info("Subjects already exist");
            return;
        }
        ;
        for (const subject of subjectData) {
            yield subject_1.default.create(subject);
        }
        ;
        console.info("Subject successfully seed");
    }
    catch (e) {
        console.error(e);
    }
});
exports.SeedSubject = SeedSubject;
