import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import router from "./routes/router.js"

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use('/asset', express.static(path.join(__dirname, 'images')));
app.use('/', router);

app.get('/get-image/:imageName', (req, res) => {
    const { imagename } = req.params;
    const imagePath = path.join(__dirname, 'images', imagename);

    res.sendFile(imagePath, (err) => {
        if(err){
            res.status(404).send('Image not found');
        }
    });
});

export default app;