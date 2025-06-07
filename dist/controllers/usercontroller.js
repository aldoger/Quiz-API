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
exports.logIn = exports.resendVerification = exports.verifyEmail = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../models/token"));
const email_1 = __importDefault(require("../middleware/email"));
const uuid_1 = require("uuid");
const user_1 = __importDefault(require("../models/user"));
const shortidgenerator_1 = require("../utils/shortidgenerator");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const data = {
            email,
            password: yield bcrypt_1.default.hash(password, 5),
        };
        const coder = yield user_1.default.create(Object.assign(Object.assign({}, data), { id: (0, shortidgenerator_1.generateShortId)(8) }));
        if (coder) {
            let setToken = yield token_1.default.create({
                userId: coder.id,
                token: (0, uuid_1.v4)(),
            });
            if (setToken) {
                (0, email_1.default)({
                    from: process.env.EMAIL_NAME,
                    to: email,
                    subject: "Account Verification Link",
                    text: `Welcome to kode kreasi. Please verify your email by clicking
                    this link:
                    http://localhost:5000/api/users/verify-email/${coder.id}/${setToken.token}`
                });
            }
            else {
                res.status(400).send("token not created");
                return;
            }
            res.status(201).send(coder);
            return;
        }
        else {
            res.status(404).send("Details are not correct");
            return;
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.signUp = signUp;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userToken = yield token_1.default.findOne({
            where: {
                userId: req.params.id,
                token: req.params.token
            },
        });
        if (!userToken) {
            res.status(400).send({
                msg: "Please verify your email first.",
            });
            return;
        }
        else {
            const coder = yield user_1.default.findOne({ where: { id: req.params.id } });
            if (!coder) {
                console.log(coder);
                res.status(401).send({
                    msg: "We were unable to find a user for this verification. Please SignUp!"
                });
                return;
            }
            else if (coder.isVerified) {
                res
                    .status(200)
                    .send("User has been already verified. Please Login");
                return;
            }
            else {
                const updated = yield coder.update({ isVerified: true }, {
                    where: {
                        id: userToken.userId,
                    },
                });
                console.log(updated);
                if (!updated) {
                    res.status(500).send({ msg: "Account cannot be verified by server" });
                    return;
                }
                else {
                    res
                        .status(200)
                        .send("Your account has been successfully verified");
                    return;
                }
            }
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.verifyEmail = verifyEmail;
const resendVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coder = yield user_1.default.findOne({ where: { email: req.body.email } });
        if (!coder) {
            res.status(400).send({
                msg: "Email not found",
            });
            return;
        }
        else {
            const id = coder === null || coder === void 0 ? void 0 : coder.id;
            const newToken = (0, uuid_1.v4)();
            let setToken = yield token_1.default.update({
                token: newToken,
            }, {
                where: { userId: id }
            });
            if (setToken) {
                (0, email_1.default)({
                    from: process.env.EMAIL_NAME,
                    to: req.body.email,
                    subject: "Account Verification Link",
                    text: `Welcome to kode kreasi. Please verify your email by clicking
                    this link:
                    http://localhost:5000/api/users/verify-email/${id}/${newToken}`
                });
            }
            else {
                res.status(400).send("token not created");
                return;
            }
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.resendVerification = resendVerification;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const coder = yield user_1.default.findOne({ where: { email: email } });
        if (coder) {
            const isSame = yield bcrypt_1.default.compare(password, coder.password);
            console.log(isSame);
            if (isSame) {
                if (coder.isVerified) {
                    let token = jsonwebtoken_1.default.sign({ id: coder.id, email: coder.email }, process.env.SECRET_KEY, {
                        expiresIn: '1d',
                    });
                    console.log("user", JSON.stringify(coder, null, 2));
                    console.log(token);
                    res.status(200).send({ token: `${token}` });
                    return;
                }
                else {
                    res.status(401).send("User not verified");
                    return;
                }
            }
            else {
                res.status(401).send("Authentication failed");
                return;
            }
        }
        else {
            res.status(401).send("Cannot find user");
            return;
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.logIn = logIn;
exports.default = [exports.signUp, exports.logIn, exports.verifyEmail];
