import { Request, Response } from "express";
import prisma from "../../database";
import { NotFoundError } from "../../helpers/api-error";

let page: number = 1;

export class ListPublicationController {
  async getPublication(req: Request, res: Response) {
    const publication = await prisma.publications.findMany({
      skip: (page - 1) * 10,
      take: 10,
    });
    if (!publication) throw new NotFoundError("Publicação não encontrada!");
    if (publication.length === 0)
      return res.json({ message: "Nenhuma publicação encontrada" });
    page++;

    return res.json(publication);
  }
}
