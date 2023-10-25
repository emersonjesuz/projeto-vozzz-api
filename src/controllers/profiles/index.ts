import { Request, Response } from "express";
import prisma from "../../database";
import { BadRequestError, InvalidFormatError } from "../../helpers/api-error";

export default class Profile {
  async createProfile(req: Request, res: Response) {
    const { name, userName, bio, photo, interests, urlWebsite, userId } =
      req.body;

    const existUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!existUser) throw new BadRequestError("usuario não existe");

    // teste
    const existUserName = await prisma.profiles.findUnique({
      where: { userName },
    });

    if (existUserName) throw new InvalidFormatError("perfil ja existe!");

    const create = await prisma.profiles.create({
      data: {
        name,
        userName,
        bio,
        photo,
        interests,
        urlWebsite,
        userId,
      },
    });

    res.status(200).json(create);
  }

  async getAllProfile(req: Request, res: Response) {
    const allProfile = await prisma.profiles.findMany();

    res.json(allProfile);
  }

  async getProfile(req: Request, res: Response) {
    const { id } = req.params;

    const profile = await prisma.profiles.findUnique({ where: { id: +id } });

    if (!profile) throw new BadRequestError("Perfil não encontrado");

    res.json(profile);
  }

  async updateProfile(req: Request, res: Response) {
    const { name, userName, bio, photo, interests, urlWebsite } = req.body;
    const { id } = req.params;

    const existProfile = await prisma.profiles.findUnique({
      where: { id: +id },
    });

    if (!existProfile)
      throw new InvalidFormatError("Informe um perfil valido!");

    const newData = {
      name,
      userName,
      bio,
      photo,
      interests,
      urlWebsite,
    };

    const dataUpdate = await prisma.profiles.update({
      data: newData,
      where: { id: +id },
    });

    res.json(dataUpdate);
  }
}
