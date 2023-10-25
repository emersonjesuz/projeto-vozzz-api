import { Request, Response } from "express";
import prisma from "../../database";
import { BadRequestError, NotFoundError } from "../../helpers/api-error";

let page: number = 1;

export default class PublicationController {
  async createPublication(req: Request, res: Response) {
    const { profileId, file, description, public_likes, public_coments } =
      req.body;

    const userProfile = await prisma.profiles.findUnique({
      where: { id: parseInt(profileId) },
    });

    if (!userProfile) throw new BadRequestError("perfil não encontrado");

    const date_tamp = new Date();

    const publication = await prisma.publications.create({
      data: {
        profileId,
        name: userProfile!.name,
        user_name: userProfile!.userName,
        photo_profile: userProfile?.photo,
        profile_checked: userProfile!.profileChecked,
        date_tamp,
        file,
        description,
        public_likes,
        public_coments,
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
