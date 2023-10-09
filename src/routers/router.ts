import express from "express";
import { errorMiddleware } from "../middlewares/error.middleware";

const router = express.Router();

router.use(errorMiddleware);
