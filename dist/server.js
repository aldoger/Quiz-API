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
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const subject_seeder_1 = require("./seed/subject_seeder");
const user_seeder_1 = require("./seed/user_seeder");
const quiz_1 = __importDefault(require("./models/quiz"));
const subject_1 = __importDefault(require("./models/subject"));
const user_1 = __importDefault(require("./models/user"));
const token_1 = __importDefault(require("./models/token"));
const score_1 = __importDefault(require("./models/score"));
const quiz_seeder_1 = require("./seed/quiz_seeder");
const port = process.env.STATUS == 'development' ? process.env.PORT : 8080;
const shouldSeed = process.argv.includes('--seed');
const shouldImigrate = process.argv.includes('--migrate');
const startserver = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.authenticate();
        console.log('✅ Database connected successfully.');
        if (shouldImigrate) {
            yield user_1.default.sync({ alter: true });
            yield token_1.default.sync({ alter: true });
            yield subject_1.default.sync({ alter: true });
            yield quiz_1.default.sync({ alter: true });
            yield score_1.default.sync({ alter: true });
        }
        if (shouldSeed) {
            console.info("Running seeders...");
            yield (0, user_seeder_1.SeedUser)();
            yield (0, subject_seeder_1.SeedSubject)();
            yield (0, quiz_seeder_1.SeedQuiz)();
            console.info("Seeding complete");
        }
        ;
        app_1.default.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (err) {
        console.error("Unable to connect to database", err);
    }
});
startserver();
