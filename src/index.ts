import "express-async-errors";
import express from "express";
import cors from "cors";
import { variables } from "./variables/treatmentVariables";
import router from "./routers/router";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.use(errorMiddleware);

app.listen(variables.port, () =>
  console.log("api inicializada na porta " + variables.port)
);
