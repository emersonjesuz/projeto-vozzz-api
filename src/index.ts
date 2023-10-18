import "express-async-errors";
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware";
import router from "./routers/router";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
router.use(errorMiddleware);

app.listen(3000, () => console.log("api inicializada na porta "));
