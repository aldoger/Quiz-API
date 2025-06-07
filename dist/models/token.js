"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Token = database_1.default.define("token", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
        references: { model: "users", key: "id" }
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { timestamps: true });
exports.default = Token;
