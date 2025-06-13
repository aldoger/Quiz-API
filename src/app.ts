import express, { Request, Response } from "express";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from 'cors'
import './types/express/index'

const app = express();

app.use(
    cors(
        {
            origin: ["http://localhost:3000", "https://kode-kreasi.vercel.app", "https://quihub-frontend.vercel.app/"],
            credentials: true,
        }
    )
);

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/photos', express.static('asset'));
app.use('/', router);

app.get("/ping", function(req: Request, res: Response) {
    res.json("ping");
    return;
});

export default app;