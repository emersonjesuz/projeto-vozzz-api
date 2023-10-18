// import { User } from ".prisma/client";
// import { IUserRepository } from "./interfaces/IUserRepository";
// import prisma from "../../database";

// class UserRepository implements IUserRepository {
//   public async create(
//     name: string,
//     email: string,
//     birth: Date,
//     password: string
//   ): Promise<User> {
//     const userRegister = await prisma.user.create({
//       data: {
//         name,
//         email,
//         birth,
//         password,
//       },
//     });
//     return userRegister;
//   }
// }

// export { UserRepository };
