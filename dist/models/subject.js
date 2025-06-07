"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Subject = database_1.default.define("subjects", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    mata_kuliah: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    src: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
});
exports.default = Subject;
