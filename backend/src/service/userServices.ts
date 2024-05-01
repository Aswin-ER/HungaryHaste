import prisma from "../server";

export interface UserTs {
  id: number;
  user_id: number;
  user_name: string;
  email: string;
  password: string;
  phone_number: string;
}

class User {
    

    // signup
    async createUser(name:string, email:string, phone:string, password:string){
        try {
            await prisma.user.create({
                data: {
                    user_name: name,
                    email: email,
                    password: password,
                    phone_number: phone
                }
            });
            
            const userDet: UserTs | null = await prisma.user.findUnique({
              where: { email: email },
            });
            return userDet;

        } catch (error) {
            console.error(error);
            throw new Error("Failed to create user.");
        }
    }

    //Login
    async userSignin(email: string, password: string){
        try {

            const user: UserTs | null = await prisma.user.findUnique({
              where: {
                email,
              },
            });

            return user;
            
        } catch (error) {
            console.error(error);
            throw new Error("Failed to login user.");
        }
    }
}

export default User;