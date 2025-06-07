"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortId = void 0;
const nanoid_1 = require("nanoid");
const generateShortId = (size) => {
    const nanoid = (0, nanoid_1.customAlphabet)('123456789abcdefghijklmnopqerstuvwxyz!@#$', size);
    return nanoid();
};
exports.generateShortId = generateShortId;
