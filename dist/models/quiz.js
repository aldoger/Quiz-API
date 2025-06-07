"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Quiz = database_1.default.define("quizes", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    id_mata_kuliah: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
        references: { model: "subjects", key: "id" }
    },
    judul_soal: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    opsi: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    src: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
}, { timestamps: true });
exports.default = Quiz;
