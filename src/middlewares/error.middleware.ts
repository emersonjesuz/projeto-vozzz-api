import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-error";

export const errorMiddleware = async (
  err: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode ?? 500;
  console.log(err);

  if (
    statusCode === 401 ||
    err.message === "invalid token" ||
    err.message === "invalid signature"
  ) {
    return res.status(401).json({ message: "Não altorizado!" });
  }

  return res.status(statusCode).json({ message: err.message });
};
