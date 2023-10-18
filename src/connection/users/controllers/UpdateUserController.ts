import { Request, Response } from "express";
import prisma from "../../../database/index";
import { BadRequestError, NotFoundError } from "../../../helpers/api-error";

export class UpdateUserController {
  async updateUser(req: Request, res: Response) {
    const { name, password, email } = req.body;
    const userId = req.params.id;

    const userExist = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!userExist) {
      throw new NotFoundError("Usuário não encontrado.");
    }

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail && userWithSameEmail.id !== parseInt(userId)) {
      // Usuário com o mesmo email já existe e não é o usuário que está sendo atualizado.
      throw new BadRequestError("E-mail já existe.");
    }

    const user = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        name,
        password,
        email,
      },
    });

    return res.json(user);
  }
}
