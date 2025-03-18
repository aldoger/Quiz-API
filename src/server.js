import app from "./app.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT || 3000;

const startserver =  () => {
    try{
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }catch(err){
        console.error("Unable to connect to database", err);
    }
}

startserver();