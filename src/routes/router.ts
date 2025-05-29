import { Router } from "express";
import { signUp, logIn, verifyEmail, resendVerification } from "../controllers/usercontroller.js";
import { saveUser, userAuthorization } from "../middleware/userAuth.js";

const router = Router();


router.post("/register",saveUser, signUp);
router.post("/login", logIn);
router.get("/api/users/verify-email/:id/:token", verifyEmail);
router.post("/resendtoken", resendVerification);

export default router;