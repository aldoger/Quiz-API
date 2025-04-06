import pg from 'pg'
import { Sequelize } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres'
    }
)

export default sequelize