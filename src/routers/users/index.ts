import { Router } from "express";
import { CreateUserController } from "../../controllers/users/CreateUserController";
import { ListAllUserController } from "../../controllers/users/GetAllUserController";
import { ListUserIdController } from "../../controllers/users/GetUserId";
import { UpdateUserController } from "../../controllers/users/UpdateUserController";

const routerUser = Router();

routerUser.post("/registerUser", new CreateUserController().createUser);

routerUser.get("/users", new ListAllUserController().listAllUser);

routerUser.get("/users/:id", new ListUserIdController().listUserId);

routerUser.put("/userModify/:id", new UpdateUserController().updateUser);

export default routerUser;
