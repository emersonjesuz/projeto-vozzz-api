import { Router } from "express";
import { User } from "../../controllers/users/UserController";
import { authMiddleware } from "../../middlewares/users/auth";

const routerUser = Router();

routerUser.post("/registerUser", new User().createUser);

routerUser.post("/login", new User().login);

routerUser.get("/users", authMiddleware, new User().listAllUser);

routerUser.get("/users/:id", authMiddleware, new User().listUserId);

routerUser.put("/userModify/:id", authMiddleware, new User().updateUser);

export default routerUser;
