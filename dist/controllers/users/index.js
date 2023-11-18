"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../../database/index"));
const api_error_1 = require("../../helpers/api-error");
class User {
    async createUser(req, res) {
        const { name, email, birth, password } = req.body;
        const userExist = await index_1.default.user.findUnique({ where: { email } });
        if (userExist) {
            throw new api_error_1.InvalidFormatError("Usuário já existe!");
        }
        if (!email || !name || !birth || !password) {
            throw new api_error_1.InvalidFormatError("Campos obrigatórios.");
        }
        const passwordHash = await bcrypt_1.default.hash(password, 8);
        const date = new Date(birth);
        const user = await index_1.default.user.create({
            data: {
                name,
                email,
                birth: date,
                password: passwordHash,
            },
        });
        const { password: _, ...newUser } = user;
        return res.status(201).json(newUser);
    }
    async listAllUser(_, res) {
        const users = await index_1.default.user.findMany();
        return res.json({ users });
    }
    async listUserId(req, res) {
        const userId = req.params.id;
        const user = await index_1.default.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });
        if (!user) {
            throw new api_error_1.NotFoundError("Usuário não encontrado.");
        }
        res.send(user);
    }
    async updateUser(req, res) {
        const { name, password, email } = req.body;
        const userId = req.params.id;
        const userExist = await index_1.default.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });
        if (!userExist) {
            throw new api_error_1.NotFoundError("Usuário não encontrado.");
        }
        const userWithSameEmail = await index_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (userWithSameEmail && userWithSameEmail.id !== parseInt(userId)) {
            throw new api_error_1.BadRequestError("E-mail já existe.");
        }
        const user = await index_1.default.user.update({
            where: {
                id: parseInt(userId),
            },
            data: {
                name,
                password,
                email,
            },
        });
        return res.json(user);
    }
    async login(req, res) {
        var _a, _b;
        const { email, password } = req.body;
        const user = await index_1.default.user.findUnique({ where: { email } });
        if (!user)
            throw new api_error_1.NotFoundError("Usuário não encontrado.");
        const comparePass = bcrypt_1.default.compare(password, (_a = user.password) !== null && _a !== void 0 ? _a : "");
        if (!comparePass)
            throw new api_error_1.BadRequestError("E-mail ou senha inválidos.");
        const token = jsonwebtoken_1.default.sign({ id: user.id }, (_b = process.env.JWT_PASS) !== null && _b !== void 0 ? _b : "", {
            expiresIn: "6h",
        });
        const { password: _, ...userLogin } = user;
        return res.json({ user: userLogin, token: token });
    }
    async loginInFirebase(req, res) {
        var _a;
        const { name, uid } = req.body;
        if (!name || !uid)
            throw new api_error_1.BadRequestError("Informe os dados corretamente");
        const verifyLogin = await index_1.default.user.findUnique({ where: { uid: uid } });
        let user;
        const birth = new Date();
        if (!verifyLogin) {
            user = await index_1.default.user.create({ data: { name, uid: uid, birth } });
        }
        const newUser = verifyLogin !== null && verifyLogin !== void 0 ? verifyLogin : user;
        const token = jsonwebtoken_1.default.sign({ id: newUser === null || newUser === void 0 ? void 0 : newUser.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : "", {
            expiresIn: "6h",
        });
        res.json({ user: newUser, token });
    }
}
exports.User = User;
