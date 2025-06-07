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
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendingMail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ from, to, subject, text }) {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_NAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from,
            to,
            subject,
            text,
        };
        const info = yield transporter.sendMail(mailOptions);
        console.log('Email Sent Successfully');
        console.log(info);
        return info;
    }
    catch (e) {
        console.error('Error cannot send email:', e);
        throw e;
    }
});
exports.default = sendingMail;
