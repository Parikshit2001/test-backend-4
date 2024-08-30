import { Router } from "express";
import { signinUser, signoutUser, signupUser } from "../controllers/User";

const router = Router();

router.route("/signin").post(signinUser);
router.route("/signup").post(signupUser);
router.route("/signout").post(signoutUser);

export default router;
