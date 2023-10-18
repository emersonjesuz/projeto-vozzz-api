import { Request, Response } from "express";
import prisma from "../../../database";

export class ListAllUserController {
  async listAllUser(_: Request, res: Response) {
    const users = await prisma.user.findMany();
    res.send(users);
  }
}
