import { Request, Response } from "express";
import prisma from "../../database";
import { BadRequestError, NotFoundError } from "../../helpers/api-error";

export default class PublicationController {
  async createPublication(req: Request, res: Response) {
    const { profileId, file, description } = req.body;

    const userProfile = await prisma.profiles.findUnique({
      where: { id: parseInt(profileId) },
    });

    if (!userProfile) throw new BadRequestError("perfil não encontrado");

    const date = new Date();

    const publication = await prisma.publications.create({
      data: {
        profileId,
        name: userProfile!.name,
        userName: userProfile!.userName,
        photo: userProfile?.photo,
        profileChecked: userProfile!.profileChecked,
        date,
        file,
        description,
      },
    });

    return res.json(publication);
  }

  async getPublication(req: Request, res: Response) {
    const id = req.params.id;

    const publication = await prisma.publications.findUnique({
      where: { id: parseInt(id) },
    });

    if (!publication) throw new NotFoundError("Publicação não encontrada!");

    return res.json(publication);
  }

  async listPublications(req: Request, res: Response) {
    const { index } = req.params;
    const page: number = Number(index);

    const publication = await prisma.publications.findMany({
      skip: (page - 1) * 10,
      take: 10,
    });

    return res.json(publication);
  }

  async editPublication(req: Request, res: Response) {
    const id = req.params.id;
    const { file, description } = req.body;

    const verifyPublication = await prisma.publications.findUnique({
      where: { id: parseInt(id) },
    });

    if (!verifyPublication)
      throw new NotFoundError("Publicação não encontrada!");

    const publication = await prisma.publications.update({
      where: { id: parseInt(id) },
      data: {
        description,
        file,
      },
    });

    return res.json(publication);
  }

  async deletePublication(req: Request, res: Response) {
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
