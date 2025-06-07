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
exports.SeedQuiz = void 0;
const quiz_1 = __importDefault(require("../models/quiz"));
const subject_1 = __importDefault(require("../models/subject"));
const shortidgenerator_1 = require("../utils/shortidgenerator");
const SeedQuiz = () => __awaiter(void 0, void 0, void 0, function* () {
    console.info("Seeding quiz...");
    const dasprogId = yield subject_1.default.findOne({ where: { mata_kuliah: "Dasar Pemrograman" } });
    const sisdigId = yield subject_1.default.findOne({ where: { mata_kuliah: "Sistem Digital" } });
    const pplId = yield subject_1.default.findOne({ where: { mata_kuliah: "Pengembangan Perangkat Lunak" } });
    const quizData = [
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: dasprogId === null || dasprogId === void 0 ? void 0 : dasprogId.id,
            judul_soal: "Apa output dari program ini?",
            opsi: [
                { text: "Tidak ada", value: true },
                { text: "Error", value: false },
                { text: "0", value: false },
            ],
            src: "/photos/images/dasprog/2.png"
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: dasprogId === null || dasprogId === void 0 ? void 0 : dasprogId.id,
            judul_soal: "Apa fungsi dari header ini?",
            opsi: [
                { text: "0", value: true },
                { text: "hello world", value: false },
                { text: "error", value: false }
            ],
            src: "/photos/images/dasprog/3.png"
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: dasprogId === null || dasprogId === void 0 ? void 0 : dasprogId.id,
            judul_soal: "Fungsi untuk menulis 'Hello World!'",
            opsi: [
                { text: "print('hello world')", value: false },
                { text: `printf("Hello World!")`, value: true },
                { text: "console.log(Hello world!)", value: false }
            ],
            src: "/photos/images/dasprog/1.png"
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: dasprogId === null || dasprogId === void 0 ? void 0 : dasprogId.id,
            judul_soal: "Tipe data apa yang digunakan untuk bilangan bulat?",
            opsi: [
                { text: "double", value: false },
                { text: "float", value: false },
                { text: "int", value: true }
            ],
            src: undefined
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: dasprogId === null || dasprogId === void 0 ? void 0 : dasprogId.id,
            judul_soal: "Perintah apa yang digunakan untuk menginput data?",
            opsi: [
                { text: "printf()", value: false },
                { text: "scanf()", value: true },
                { text: "read()", value: false }
            ],
            src: undefined
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: sisdigId === null || sisdigId === void 0 ? void 0 : sisdigId.id,
            judul_soal: "Ubah angka biner menjadi decimal",
            opsi: [
                { text: "15", value: true },
                { text: "12", value: false },
                { text: "30", value: false }
            ],
            src: "/photos/images/sisdig/1.png"
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: sisdigId === null || sisdigId === void 0 ? void 0 : sisdigId.id,
            judul_soal: "Ubah angka oktal menjadi biner",
            opsi: [
                { text: "10000", value: true },
                { text: "1110", value: false },
                { text: "101101", value: false }
            ],
            src: "photos/images/sisdig/2.png"
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: sisdigId === null || sisdigId === void 0 ? void 0 : sisdigId.id,
            judul_soal: "Ubah angka heksadesimal ke biner",
            opsi: [
                { text: "001110", value: false },
                { text: "10001", value: true },
                { text: "11001", value: false }
            ],
            src: "/photos/images/sisdig/3.png"
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: sisdigId === null || sisdigId === void 0 ? void 0 : sisdigId.id,
            judul_soal: "Apa hasil dari pertambahan bilangan biner tersebut",
            opsi: [
                { text: "101", value: false },
                { text: "110", value: false },
                { text: "100", value: true }
            ],
            src: "/photos/images/sisdig/4.png"
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: pplId === null || pplId === void 0 ? void 0 : pplId.id,
            judul_soal: "Apa kepanjangan SDLC?",
            opsi: [
                { text: "Software Development Life Cycle", value: true },
                { text: "Software Development Live Cycle", value: false },
                { text: "Software Documention Loan Case", value: false }
            ],
            src: undefined
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: pplId === null || pplId === void 0 ? void 0 : pplId.id,
            judul_soal: "Gambar ini termasuk process flow apa?",
            opsi: [
                { text: "Linier", value: true },
                { text: "Iterative", value: false },
                { text: "Parallel", value: false }
            ],
            src: "/photos/images/ppl/2.png"
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: pplId === null || pplId === void 0 ? void 0 : pplId.id,
            judul_soal: "Berikut jenis process flow(Kecuali)",
            opsi: [
                { text: "Parallel", value: false },
                { text: "Continuous", value: true },
                { text: "Evolutionary", value: false }
            ],
            src: undefined
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: pplId === null || pplId === void 0 ? void 0 : pplId.id,
            judul_soal: "Contoh process flow Linier",
            opsi: [
                { text: "Prototyping", value: false },
                { text: "Spiral Model", value: false },
                { text: "Waterfall Model", value: true }
            ],
            src: undefined
        },
        {
            id: (0, shortidgenerator_1.generateShortId)(13),
            id_mata_kuliah: pplId === null || pplId === void 0 ? void 0 : pplId.id,
            judul_soal: "Definisi Iterative adalah...",
            opsi: [
                { text: "Menjalankan kegiatan sebelum melanjutkan yang berikutnya", value: true },
                { text: "Menjalankan aktivitas secara melingkar", value: false },
                { text: "Menjalankan satu atau lebih kegiatan secara parallel", value: false }
            ],
            src: undefined
        }
    ];
    try {
        const count = yield quiz_1.default.findAll({});
        if (count.length > 0) {
            console.info("Quiz already exist");
            return;
        }
        for (const quiz of quizData) {
            yield quiz_1.default.create(quiz);
        }
        console.info("Quiz successfully seed");
    }
    catch (e) {
        console.error(e);
    }
});
exports.SeedQuiz = SeedQuiz;
