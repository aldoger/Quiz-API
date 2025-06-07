import { Sequelize } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

let sequelize: Sequelize;

if (process.env.STATUS === 'development') {
  sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DATABASE,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
  });
} else {
  const databasURL = process.env.DATABASE_URL as string;
  sequelize = new Sequelize(databasURL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
  });
}

export default sequelize;
