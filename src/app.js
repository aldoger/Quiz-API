import express from "express";
import router from "./routes/router.js";
import bodyParser from "body-parser";
import cors from 'cors'


const app = express();

app.use(
    cors(
        {
            origin: `http://localhost:5000`,
            credentials: true
        }
    )
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/photos', express.static('asset'));
app.use('/', router);

db.connect();

export default app;