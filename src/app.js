import express from "express";
import router from "./routes/router.js"

const app = express();

app.use('/', router);

export default app;