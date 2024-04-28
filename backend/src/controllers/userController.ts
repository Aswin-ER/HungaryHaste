import { Request, Response } from "express"
import User from "../service/userServices";
import bcrypt from 'bcrypt';


const userController = {
    userSignup: async (req: Request, res:Response) => {

        try {
            const { email, password, phone, name} = req.body;
            const userRepo = new User();

            // Bcrypted password before instering into db
            const salt  = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const createdUser = await userRepo.createUser(name, email, phone, hashedPassword);

            console.log(createdUser, "inserted user details!");
            res.status(200).json({
                success: true,
                data: createdUser,
                message: "Signup Successfully!"
            })
             
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal server Error!",
            })
        }
    }
}

export default userController;