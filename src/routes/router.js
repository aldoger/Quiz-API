import { Router } from "express";
import { GetQuizAlin, GetQuizDasprog, GetQuizSisdig, GetQuizPPL, GetQuizStrukdat } from "../controllers/quizcontroller.js";
import { signUp, logIn } from "../controllers/usercontroller.js";
import { saveUser } from "../middleware/userAuth.js";

const router = Router();

router.get("/ppl", GetQuizPPL);
router.get("/dasprog", GetQuizDasprog);
router.get("/alin", GetQuizAlin);
router.get("/sisdig", GetQuizSisdig);
router.get("/strukdat", GetQuizStrukdat);

router.post("/signin",saveUser, signUp);
router.post("/login", logIn);
router.post("/api/users/verify-email/:id/:token");

export default router;