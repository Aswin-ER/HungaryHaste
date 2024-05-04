import express from "express";
import userController from "../controllers/userController";
import { validateSignin, validateSignup } from "../middleware/express-validator";

const userRouter = express.Router();

userRouter.post("/signup", validateSignup, userController.userSignup);

userRouter.post("/signin", validateSignin, userController.userLogin);

userRouter.post("/refresh_token", userController.refreshToken);

export default userRouter;