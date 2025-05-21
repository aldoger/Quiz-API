import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database"

export interface SubjectAttributes {
    id: number,
    mata_kuliah: string,
}

export interface SubjectCreationAttributes extends Optional<SubjectAttributes, "id"> {}

export interface SubjectInstance extends Model<SubjectAttributes, SubjectCreationAttributes>, SubjectAttributes {}

const Subject = sequelize.define<SubjectInstance>(
  "subjects",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    mata_kuliah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, 
  }
);

export default Subject;