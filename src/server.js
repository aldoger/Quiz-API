import app from "./app.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from "./models/database.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT || 3000;

const startserver = async () => {
    try{

        await sequelize.authenticate();
        console.log('✅ Database connected successfully.');

        // Optional: sync all models
        await sequelize.sync(); 


        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }catch(err){
        console.error("Unable to connect to database", err);
    }
}

startserver();