import { Router } from "express";
import { GetQuizAlin, GetQuizDasprog, GetQuizSisdig, GetQuizPPL, GetQuizStrukdat } from "../controllers/quizcontroller.js";
import { signUp, logIn, verifyEmail, resendVerification } from "../controllers/usercontroller.js";
import { saveUser, userAuthorization } from "../middleware/userAuth.js";

const router = Router();

router.get("/ppl", userAuthorization, GetQuizPPL);
router.get("/dasprog", userAuthorization, GetQuizDasprog);
router.get("/alin", userAuthorization, GetQuizAlin);
router.get("/sisdig", userAuthorization, GetQuizSisdig);
router.get("/strukdat", userAuthorization, GetQuizStrukdat);

router.post("/register",saveUser, signUp);
router.post("/login", logIn);
router.get("/api/users/verify-email/:id/:token", verifyEmail);
router.post("/resendtoken", resendVerification);

export default router;