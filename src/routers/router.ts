import { Router } from "express";
import routerUser from "./users/users.router";

const router = Router();

router.use(routerUser);

export default router;
