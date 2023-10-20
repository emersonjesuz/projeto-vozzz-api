import { Request, Response } from "express";
import prisma from "../../database";
import { InvalidFormatError } from "../../helpers/api-error";

export default class Profile {
  async createProfile(req: Request, res: Response) {
    const { name, userName, bio, photo, interests, urlWebsite } = req.body;

    const { userId } = req.body;

    const existUserName = await prisma.profiles.findUnique({ where: userName });

    if (!existUserName) throw new InvalidFormatError("user namer ja existe!");

    const dataProfile = {
      name,
      userName,
      bio,
      photo,
      interests,
      urlWebsite,
      userId,
    };

    const create = await prisma.profiles.create({
      data: dataProfile,
    });

    res.status(200).json(create);
  }
}
