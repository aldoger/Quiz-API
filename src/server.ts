import app from "./app.js";
import sequelize from "./config/database.js";

const port = process.env.STATUS == 'development' ? process.env.PORT : 8080;

const startserver = async () => {
    try{

        await sequelize.authenticate();
        console.log('✅ Database connected successfully.');


        await sequelize.sync(); 


        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }catch(err){
        console.error("Unable to connect to database", err);
    }
}

startserver();