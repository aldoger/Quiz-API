"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Score = database_1.default.define("scores", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    id_quiz: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: { model: "quizes", key: "id" }
    },
    id_user: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: { model: "users", key: "id" }
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        onDelete: "cascade",
        onUpdate: "cascade",
        defaultValue: 0,
    }
}, { timestamps: true });
exports.default = Score;
