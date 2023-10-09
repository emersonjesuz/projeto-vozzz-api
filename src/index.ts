import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.listen(3000, () => console.log("api inicializada na porta " + 3000));
