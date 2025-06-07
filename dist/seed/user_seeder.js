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
exports.SeedUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const shortidgenerator_1 = require("../utils/shortidgenerator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const SeedUser = () => __awaiter(void 0, void 0, void 0, function* () {
    console.info("Seeding user...");
    const userData = [
        {
            email: "nainggolanben12@gmail.com",
            id: (0, shortidgenerator_1.generateShortId)(8),
            password: yield bcrypt_1.default.hash("Aldoger19!", 5),
            isVerified: true,
        },
        {
            email: "madesatya505@gmail.com",
            id: (0, shortidgenerator_1.generateShortId)(8),
            password: yield bcrypt_1.default.hash("satya", 5),
            isVerified: true,
        }
    ];
    try {
        const count = yield user_1.default.count();
        if (count > 0) {
            console.info("User already exists");
            return;
        }
        for (const user of userData) {
            yield user_1.default.create(user);
        }
        console.info("User successfully seeded");
    }
    catch (e) {
        console.error(e);
    }
});
exports.SeedUser = SeedUser;
