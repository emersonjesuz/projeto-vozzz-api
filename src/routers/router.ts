import { Router } from "express";
import routerUser from "./users";
import routerProfile from "./profiles";
import { errorMiddleware } from "../middlewares/error.middleware";

const router = Router();

router.use(routerUser);
router.use(routerProfile);
router.use(errorMiddleware);

export default router;
