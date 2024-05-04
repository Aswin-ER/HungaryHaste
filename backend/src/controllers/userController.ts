import { Request, Response } from "express";
import User, { UserTs } from "../service/userServices";
import bcrypt from "bcrypt";
import funJwt from "../utils/funJwt";

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
        return res.status(200).json({
          success: false,
          data: "",
          message: "Invalid user!",
        });
      }

      if (user?.password) {
        const validPassword = await bcrypt.compare(password, user?.password);

        if (!validPassword) {
          return res.status(200).json({
            success: false,
            data: "",
            message: "Invalid password!",
          });
        }

        //get tokens and give to client
        const { tokens } = await funJwt(user?.user_name);

        const { password: userPassword, id, user_id, ...clientUserInfo } = user;

        //set cookies
        res.cookie("accessToken", tokens.access_token, {
          httpOnly: true,
          maxAge: 3600000, // 1hrs
          path: "/",
        });

        res.cookie("refreshToken", tokens.refresh_token, {
          httpOnly: true,
          maxAge: 604800000, // 1week
          path: "/",
        });

        return res.status(200).json({
          success: true,
          data: { clientUserInfo, tokens },
          message: "Signin Successfully!",
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

  //refersh token
  refreshToken: async (req: Request, res: Response) => {
    try {
      const { user_name } = req.body;

      const { tokens } = await funJwt(user_name);

      //set cookies
      res.cookie("accessToken", tokens.access_token, {
        httpOnly: true,
        maxAge: 3600000, // 1hrs
        path: "/",
      });

      res.cookie("refreshToken", tokens.refresh_token, {
        httpOnly: true,
        maxAge: 604800000, // 1week
        path: "/",
      });

      return res.status(200).json({
        success: true,
        data: { tokens },
        message: "Token created Successfully!",
      });
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
