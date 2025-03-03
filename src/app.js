import express from "express";
import router from "./routes/router.js"


const app = express();

app.use('/photos', express.static('asset'));
app.use('/', router);


export default app;