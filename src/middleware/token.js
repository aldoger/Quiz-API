import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });


const jwt = jsonwebtoken;

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    console.error("❌ ERROR: SECRET_KEY is missing in .env");
    process.exit(1); 
}

export default function GenerateToken(username){
    const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1800s' });
    return token;
}