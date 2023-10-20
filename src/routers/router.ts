import { Router } from "express";
import publicationsRouter from "./publications.router";

const router = Router();

router.use(publicationsRouter);

export default router;