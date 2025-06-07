import express from "express";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from 'cors'
import './types/express/index'

const app = express();

app.use(
    cors(
        {
            origin: `https://kode-kreasi.vercel.app/`,
            credentials: true
        }
    )
);

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/photos', express.static('asset'));
app.use('/', router);


export default app;