import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database"

export interface SubjectAttributes {
    id: string,
    mata_kuliah: string,
    src: string
}

export interface SubjectCreationAttributes extends Optional<SubjectAttributes, "id" | "src"> {}

export interface SubjectInstance extends Model<SubjectAttributes, SubjectCreationAttributes>, SubjectAttributes {}

const Subject = sequelize.define<SubjectInstance>(
  "subjects",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    mata_kuliah: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    src: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true, 
  }
);

export default Subject;