import { Router } from "express";
import { GetQuizAlin, GetQuizDasprog, GetQuizSisdig, GetQuizPPL, GetQuizStrukdat } from "../controllers/quizcontroller.js";
import { signUp, logIn, verifyEmail, resendVerification } from "../controllers/usercontroller.js";
import { saveUser } from "../middleware/userAuth.js";

const router = Router();

router.get("/ppl", GetQuizPPL);
router.get("/dasprog", GetQuizDasprog);
router.get("/alin", GetQuizAlin);
router.get("/sisdig", GetQuizSisdig);
router.get("/strukdat", GetQuizStrukdat);

router.post("/register",saveUser, signUp);
router.post("/login", logIn);
router.get("/api/users/verify-email/:id/:token", verifyEmail);
router.post("/resendtoken", resendVerification)

export default router;