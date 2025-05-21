import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database"


type Opsi = {
    text: string,
    value: boolean,
}


export interface QuizAttribtes {
    id: number,
    id_mata_kuliah: number,
    judul_Soal: string,
    opsi: Opsi[]
}

export interface QuizCreationAttributes extends Optional<QuizAttribtes, "id"> {}

export interface QuizInstance extends Model<QuizAttribtes, QuizCreationAttributes>, QuizAttribtes {}

const Quiz = sequelize.define("quiz", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    id_mata_kuliah: {
        type: DataTypes.INTEGER,
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
    }
});

export default Quiz;
