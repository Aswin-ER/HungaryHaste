import prisma from "../server";

class User {
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
            
            const userDet = await prisma.user.findUnique({where: { email: email}});
            return userDet;

        } catch (error) {
            console.error(error);
            throw new Error("Failed to create user.");
        }
    }
}

export default User;