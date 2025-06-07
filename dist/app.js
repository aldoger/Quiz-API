"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("./types/express/index");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: `https://kode-kreasi.vercel.app/`,
    credentials: true
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/photos', express_1.default.static('asset'));
app.use('/', router_1.default);
exports.default = app;
