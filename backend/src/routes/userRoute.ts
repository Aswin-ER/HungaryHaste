import express from "express";
import userController from "../controllers/userController";
import { validateSignin, validateSignup } from "../middleware/express-validator";

const userRouter = express.Router();

userRouter.post("/signup", validateSignup, userController.userSignup);

userRouter.post("/signin", validateSignin, userController.userLogin);

export default userRouter;