import { Router } from "express";
import { User } from "../../controllers/users";
import { authMiddleware } from "../../middlewares/users/auth";

const routerUser = Router();

routerUser.post("/create", new User().createUser);

routerUser.post("/login", new User().login);

routerUser.post("/account/external", new User().loginInFirebase);

routerUser.get("/users", new User().listAllUser);

routerUser.get("/users/:id", new User().listUserId);

routerUser.put("/update/:id", authMiddleware, new User().updateUser);

export default routerUser;
