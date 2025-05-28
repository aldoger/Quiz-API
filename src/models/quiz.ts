import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database"


export type Opsi = {
    text: string,
    value: boolean,
}


export interface QuizAttribtes {
    id: string,
    id_mata_kuliah: string,
    judul_Soal: string,
    opsi: Opsi[],
    src: string
}

export interface QuizCreationAttributes extends Optional<QuizAttribtes, "id"> {}

export interface QuizInstance extends Model<QuizAttribtes, QuizCreationAttributes>, QuizAttribtes {}

const Quiz = sequelize.define("quizes", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    id_mata_kuliah: {
        type: DataTypes.STRING,
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
        references: { model: "subjects", key: "id" }
    },
    judul_soal: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    opsi: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    src: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
}, { timestamps: true });

export default Quiz;
