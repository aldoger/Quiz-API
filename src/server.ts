import app from "./app";
import sequelize from "./config/database";
import { SeedSubject } from "./seed/subject_seeder";
import { SeedUser } from "./seed/user_seeder";
import Quiz from "./models/quiz";
import Subject from "./models/subject";
import Coder from "./models/user";
import Token from "./models/token";
import Score from "./models/score";
import { SeedQuiz } from "./seed/quiz_seeder";

const port = process.env.STATUS == 'development' ? process.env.PORT : 8080;
const shouldSeed = process.argv.includes('--seed');
const shouldImigrate = process.argv.includes('--migrate');

const startserver = async () => {
    try{

        await sequelize.authenticate();
        console.log('✅ Database connected successfully.');


        if(shouldImigrate){
            await Coder.sync({ alter: true });
            await Token.sync({ alter: true });
            await Subject.sync({ alter: true });
            await Quiz.sync({ alter: true });
            await Score.sync({ alter: true });
        }

        if(shouldSeed){
            console.info("Running seeders...")
            await SeedUser();
            await SeedSubject();
            await SeedQuiz();
            console.info("Seeding complete");
        };


        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }catch(err){
        console.error("Unable to connect to database", err);
    }
}

startserver();