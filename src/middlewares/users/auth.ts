import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../helpers/api-error";
import prisma from "../../database/index";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: number;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) throw new UnauthorizedError("Não autorizado!");

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, "teste") as JwtPayload;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new UnauthorizedError("Não autorizado!");

  // const { password: _, ...loggedUser } = user;

  // req.user = loggedUser;

  next();
};
