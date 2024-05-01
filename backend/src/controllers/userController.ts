import { Request, Response } from "express";
import User, { UserTs } from "../service/userServices";
import bcrypt from "bcrypt";

const userController = {
  // Signup user
  userSignup: async (req: Request, res: Response) => {
    try {
      const { email, password, phone, name } = req.body;
      const userRepo = new User();

      // Bcrypted password before instering into db
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser: UserTs | null = await userRepo.createUser(
        name,
        email,
        phone,
        hashedPassword
      );
      console.log(createdUser, "inserted user details!");

      if (createdUser) {
        const {
          password: userPassword,
          id,
          user_id,
          ...clientUserInfo
        } = createdUser;

        res.status(200).json({
          success: true,
          data: clientUserInfo,
          message: "Signup Successfully!",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server Error!",
      });
    }
  },

  //Login user
  userLogin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const userRepo = new User();

      const user: UserTs | null = await userRepo.userSignin(email, password);

      if (!user) {
        res.status(400).json({
          success: false,
          data: "",
          message: "Invalid user!",
        });
      }

      if (user?.password) {
        const validPassword = await bcrypt.compare(password, user?.password);

        if (validPassword) {
          const {
            password: userPassword,
            id,
            user_id,
            ...clientUserInfo
          } = user;
          return res.status(200).json({
            success: true,
            data: clientUserInfo,
            message: "Signin Successfully!",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          data: "",
          message: "Invalid password!",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server Error!",
      });
    }
  },
};

export default userController;
