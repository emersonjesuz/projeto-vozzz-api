import { Router } from "express";
import routerUser from "./users";
import routerProfile from "./profiles";
import publicationsRouter from "./publications.router";

const router = Router();

router.use(routerUser);
router.use(routerProfile);
router.use(publicationsRouter);

export default router;
