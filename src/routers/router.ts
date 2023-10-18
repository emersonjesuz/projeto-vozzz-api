import { Router } from "express";
import { CreateUserController } from "../controllers/users/CreateUserController";
import { PrismaClient } from "@prisma/client";
import { ListAllUserController } from "../connection/users/controllers/GetAllUserController";
import { ListUserIdController } from "../connection/users/controllers/GetUserId";
import { UpdateUserController } from "../connection/users/controllers/UpdateUserController";

const prisma = new PrismaClient();
const router = Router();

router.get("/");

router.post("/registerUser", new CreateUserController().createUser);

router.get("/users", new ListAllUserController().listAllUser);

router.get("/users/:id", new ListUserIdController().listUserId);

router.put("/userModify/:id", new UpdateUserController().updateUser);

// router.use(errorMiddleware);
export default router;
