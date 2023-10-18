import { Request, Response } from "express";
import prisma from "../../database/index";
import { InvalidFormatError } from "../../helpers/api-error";

class CreateUserController {
  async createUser(req: Request, res: Response) {
    const { name, email, birth, password } = req.body;
    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist) {
      throw new InvalidFormatError("E-mail já cadastrado!");
    }

    const date = new Date(birth);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        birth: date,
        password,
      },
    });

    return res.json(user);
  }
}
export { CreateUserController };
