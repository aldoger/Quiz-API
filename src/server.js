import app from "./app.js";

const port = 3000;

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