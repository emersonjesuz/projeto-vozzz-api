import { Request, Response } from "express";
import prisma from "../../database";
import { NotFoundError } from "../../helpers/api-error";

export class DeletePublicationController {
  async getPublication(req: Request, res: Response) {
    const id = req.params.id;

    const publication = await prisma.publications.findUnique({
      where: { id: parseInt(id) },
    });

    if (!publication) throw new NotFoundError("Publicação não encontrada!");

    await prisma.publications.delete({
      where: { id: parseInt(id) },
    });

    return res.send();
  }
}
