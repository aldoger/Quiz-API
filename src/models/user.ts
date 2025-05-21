import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Model, Optional } from "sequelize";

export interface CoderAttributes {
  id: number;
  email: string;
  password: string;
  isVerified: boolean;
}

export interface CoderCreationAttributes extends Optional<CoderAttributes, 'id' | 'isVerified'> {}

export interface CoderInstance
  extends Model<CoderAttributes, CoderCreationAttributes>,
    CoderAttributes {}

const Coder = sequelize.define<CoderInstance>("user", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,        
            allowNull: false,
            unique: true,
        },

       
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {timestamps: true}
);

export default Coder;