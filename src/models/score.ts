import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface ScoreAttribute {
    id: string,
    id_quiz: string,
    id_user: string,
    score: number
}

export interface ScoreCreationAttribute extends Optional<ScoreAttribute, "id" | "score" > {}

export interface ScoreInstance extends Model<ScoreAttribute, ScoreCreationAttribute>, ScoreAttribute {}

const Score = sequelize.define<ScoreInstance>("scores", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    
    id_quiz: {
        type: DataTypes.STRING,
        allowNull: false,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: { model: "quizes", key: "id" }
    },

    id_user: {
        type: DataTypes.STRING,
        allowNull: false,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: { model: "users", key: "id" }
    },

    score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: "cascade",
        onUpdate: "cascade",
        defaultValue: 0,
    }
}, { timestamps: true });

export default Score;
