import { Request, Response } from "express";
import prisma from "../../database";
import { NotFoundError } from "../../helpers/api-error";

export class ListUserIdController {
  async listUserId(req: Request, res: Response) {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    res.send(user);
  }
}
