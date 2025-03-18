import express from "express";
import router from "./routes/router.js";
import bodyParser from "body-parser";
import session from "express-session";
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

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret',
    cookie: { maxAge: 60000, secure: false }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/photos', express.static('asset'));
app.use('/', router);



export default app;