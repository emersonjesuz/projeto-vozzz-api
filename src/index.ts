import "express-async-errors";
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware";
import router from "./routers/router";
import { variables } from "./variables/treatmentVariables";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware);

app.listen(variables.port, () =>
  console.log("api inicializada na porta " + variables.port)
);
