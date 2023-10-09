import express from "express";
import cors from "cors";
import { variables } from "./variables/treatmentVariables";

const app = express();

app.use(cors());
app.use(express.json());
app.listen(variables.port, () =>
  console.log("api inicializada na porta " + variables.port)
);
