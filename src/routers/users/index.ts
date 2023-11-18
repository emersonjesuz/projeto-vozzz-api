import { Router } from "express";
import { User } from "../../controllers/users";
import { authMiddleware } from "../../middlewares/users/auth";

const routerUser = Router();

routerUser.post("/create", new User().createUser);

routerUser.post("/login", new User().login);

routerUser.post("/account/external", new User().loginInFirebase);

routerUser.use(authMiddleware);

routerUser.get("/users", new User().listAllUser);

routerUser.get("/users/:id", new User().listUserId);

routerUser.put("/update/:id", new User().updateUser);

export default routerUser;
