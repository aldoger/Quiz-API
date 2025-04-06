import { DataTypes } from "sequelize";
import sequelize from "./database";

const User = sequelize.define("user", {

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
            isEmail: true,
            allowNull: false,
        },

        score: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: true,
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

export default User;