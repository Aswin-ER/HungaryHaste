import express from "express";
import userController from "../controllers/userController";
import { validateSignup } from "../middleware/express-validator";

const userRouter = express.Router();

userRouter.post('/signup', validateSignup, userController.userSignup);

export default userRouter;