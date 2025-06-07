import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface TokenAttributes {
  id: number;
  userId: string;
  token: string;
}

export interface TokenCreationAttributes extends Optional<TokenAttributes, "id"> {}

export interface TokenInstance extends Model<TokenAttributes, TokenCreationAttributes>, TokenAttributes {}


const Token = sequelize.define<TokenInstance>("token", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },

        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            onUpdate: "cascade",
            onDelete: "cascade",
            references: { model: "users", key: "id"}
        },

        token: {
            type: DataTypes.STRING,
        },


    }, {timestamps: true}, 
);

export default Token;