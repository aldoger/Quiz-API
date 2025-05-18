import { Sequelize } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  },
  logging: false, 
});

export default sequelize