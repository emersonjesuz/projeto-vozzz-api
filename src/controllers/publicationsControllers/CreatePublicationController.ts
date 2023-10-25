import { Request, Response } from "express";
import prisma from "../../database";
import { BadRequestError } from "../../helpers/api-error";

export class CreatePublicationController {
  async createPublication(req: Request, res: Response) {
    const { id_profile, file, description, public_likes, public_coments } =
      req.body;

    const userProfile = await prisma.profiles.findUnique({
      where: { id: parseInt(id_profile) },
    });

    if (!userProfile) throw new BadRequestError("perfil não encontrado");

    const date_tamp = new Date();

    const publication = await prisma.publications.create({
      data: {
        id_profile,
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
}
