import express from "express";
import { getUsers,deleteUser,updateUser,signUpAction, signInAction, verifyAccount,forgotPassword,resetPassword,googleAuthAction} from "../controller/user.controller.js";
import { body } from "express-validator";
import { verifyAdmin } from "../middlewares/verifyUser.js";
const router = express.Router();
router.post("/sign-up",
    body("username","username is required").notEmpty(),
    body("email","email id is required").notEmpty(),
    body("email","invalid email id").isEmail(),
    body("contact","only digits are allowed").isNumeric(),signUpAction);
router.post("/sign-in",signInAction);
router.post("/verify",verifyAccount);
router.get("/users", verifyAdmin, getUsers);
router.delete("/:id", deleteUser);   
router.put("/:id", updateUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/google-auth", googleAuthAction);
export default router;