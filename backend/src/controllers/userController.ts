import { Request, Response } from "express";
import User, { UserTs } from "../service/userServices";
import bcrypt from "bcrypt";
import { funJwt, verifyRefershToken } from "../utils/funJwt";
import axios from "axios";
import client from "../utils/redisConfig";

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

  //Refersh token
  refreshToken: async (req: Request, res: Response) => {
    try {
      const existingRefershToken = req.cookies.refreshToken;

      if (!existingRefershToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token not found!",
        });
      }

      const isValid = await verifyRefershToken(existingRefershToken);

      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid refresh token!",
        });
      }

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

  //Logout
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("accessToken", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
      });

      res.clearCookie("refreshToken", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
      });

      res.status(200).json({
        success: true,
        message: "Logout Successfully!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server Error!",
      });
    }
  },

  //Get all restaurants
  getCards: async (req: Request, res: Response) => {
    try {
      const { location } = req.body;
      console.log(location);
      const latitude = location?.latitude;
      const longitude = location?.longitude;

      console.log(latitude, longitude);

      const userAgent =
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";

      const cacheKey = `restaurants:${location}`;
      const cachedData = await client.get(cacheKey);

      if (cachedData) {
        console.log("Cache hit");
        return res.json(JSON.parse(cachedData));
      }

      const response = await axios.get(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
        {
          headers: {
            "User-Agent": userAgent,
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        await client.set(cacheKey, JSON.stringify(response.data), {
          EX: 3600, //cache for one hour
        });
        res.json(response.data);
      } else {
        res.status(response.status).json({ message: "Failed to fetch data" });
      }
    } catch (error: any) {
      res
        .status(error.response?.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  },

  //Get restaurant menus
  getMenuCards: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const userAgent =
        " Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";

      const response = await axios.get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=10.51600&lng=76.21570&restaurantId=${id}`,
        {
          headers: {
            "User-Agent": userAgent,
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        res.json(response.data);
      } else {
        res.status(response.status).json({ message: "Failed to fetch data" });
      }
    } catch (error: any) {
      res
        .status(error.response?.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  },
};

export default userController;
