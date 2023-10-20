import { Router } from "express";
import routerUser from "./users";
import routerProfile from "./profiles";

const router = Router();

router.use(routerUser);
router.use(routerProfile);

export default router;
