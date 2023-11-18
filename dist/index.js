"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const treatmentVariables_1 = require("./variables/treatmentVariables");
const router_1 = __importDefault(require("./routers/router"));
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_1.default);
app.use(error_middleware_1.errorMiddleware);
app.listen(treatmentVariables_1.variables.port, () => console.log("api inicializada na porta " + treatmentVariables_1.variables.port));
