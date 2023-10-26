import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../database/index";
import {
  BadRequestError,
  InvalidFormatError,
  NotFoundError,
} from "../../helpers/api-error";

export class User {
  async createUser(req: Request, res: Response) {
    const { name, email, birth, password } = req.body;

    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist) {
      throw new InvalidFormatError("Usuário já existe!");
    }

    if (!email || !name || !birth || !password) {
      throw new InvalidFormatError("Campos obrigatórios.");
    }

    const passwordHash = await bcrypt.hash(password, 8);
    const date = new Date(birth);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        birth: date,
        password: passwordHash,
      },
    });

    const { password: _, ...newUser } = user;

    return res.status(201).json(newUser);
  }

  async listAllUser(_: Request, res: Response) {
    const users = await prisma.user.findMany();

    return res.json({ users });
  }

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

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundError("Usuário não encontrado.");

    const comparePass = bcrypt.compare(password, user.password || "");
    if (!comparePass) throw new BadRequestError("E-mail ou senha inválidos.");

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "6h",
    });

    const { password: _, ...userLogin } = user;
    return res.json({ user: userLogin, token: token });
  }

  async loginInFirebase(req: Request, res: Response) {
    const { name, uid, birth } = req.body;

    if (!name || !uid || !birth)
      throw new BadRequestError("Informe os dados corretamente");

    const verifyLogin = await prisma.user.findUnique({ where: { uid } });

    let user;

    if (!verifyLogin) {
      user = await prisma.user.create({ data: { name, uid, birth } });
    }

    const newUser = verifyLogin || user;

    const token = jwt.sign({ id: newUser?.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "6h",
    });

    res.json({ user: newUser, token });
  }
}
