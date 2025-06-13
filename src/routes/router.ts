import { Router } from "express";
import { signUp, logIn, verifyEmail, resendVerification, Me } from "../controllers/usercontroller";
import { allowAdmin, saveUser, userAuthorization } from "../middleware/userAuth";
import { addQuiz, getQuizByIdSubject } from "../controllers/quizcontroller";
import { addSubject, getAllSubject } from "../controllers/subjectcontroller";
import { getUserHighestScore, updateUserScore } from "../controllers/scorecontroller";

const router = Router();


router.post("/register",saveUser, signUp);
router.post("/login", logIn);
router.get("/api/users/verify-email/:id/:token", verifyEmail);
router.post("/resendtoken", resendVerification);
router.get("/api/me", Me);

router.post("/api/addQuiz", userAuthorization, allowAdmin, addQuiz);
router.get("/api/quiz", userAuthorization, getQuizByIdSubject);

router.post("/api/addSubject", userAuthorization, allowAdmin, addSubject);
router.get("/api/subjects", getAllSubject);

router.post("/api/submitQuiz", userAuthorization, updateUserScore);
router.get("/api/highscore", getUserHighestScore);

export default router;