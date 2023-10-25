import { Router } from "express";
import {
  CreateUserController,
  ListAllUserController,
  ListUserIdController,
  Login,
  UpdateUserController,
} from "../../controllers/users/UserController";
import { authMiddleware } from "../../middlewares/users/auth";

const userRouter = Router();

userRouter.post("/registerUser", new CreateUserController().createUser);

userRouter.post("/login", new Login().login);

userRouter.get("/users", new ListAllUserController().listAllUser);

userRouter.get("/users/:id", new ListUserIdController().listUserId);

userRouter.put(
  "/userModify/:id",
  authMiddleware,
  new UpdateUserController().updateUser
);

export default userRouter;
