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
exports.allowAdmin = exports.userAuthorization = exports.saveUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const saveUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (user) {
            res.status(409).json("email already exist");
            return;
        }
        next();
    }
    catch (err) {
        console.error(err);
    }
});
exports.saveUser = saveUser;
const userAuthorization = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const result = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            req.user = result;
            next();
        }
        catch (err) {
            console.error("JWT Error:", err);
            res.status(401).send({ msg: 'Invalid token' });
            return;
        }
    }
    else {
        res.status(401).send({ msg: 'Authorization header missing or malformed' });
        return;
    }
};
exports.userAuthorization = userAuthorization;
const allowAdmin = (req, res, next) => {
    const admin = req.user;
    if (admin.email != "nainggolanben12@gmail.com") {
        res.status(403).json({ msg: "Forbidden" });
        return;
    }
    ;
    next();
};
exports.allowAdmin = allowAdmin;
