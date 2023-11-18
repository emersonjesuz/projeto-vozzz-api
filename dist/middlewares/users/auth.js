"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const api_error_1 = require("../../helpers/api-error");
const index_1 = __importDefault(require("../../database/index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        throw new api_error_1.UnauthorizedError("Não autorizado!");
    const token = authorization.split(" ")[1];
    const { id } = jsonwebtoken_1.default.verify(token, "teste");
    const user = await index_1.default.user.findUnique({ where: { id } });
    if (!user)
        throw new api_error_1.UnauthorizedError("Não autorizado!");
    next();
};
exports.authMiddleware = authMiddleware;
