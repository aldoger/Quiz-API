import { DataTypes } from "sequelize";
import sequelize from "./database.js";

const Coder = sequelize.define("user", {

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