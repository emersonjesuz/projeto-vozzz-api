"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const api_error_1 = require("../../helpers/api-error");
class Profile {
    async createProfile(req, res) {
        const { userId, type } = req.body;
        const user = await database_1.default.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new api_error_1.BadRequestError("usuario não existe");
        const typeProfofile = type;
        const ischecked = typeProfofile !== "cidadao" &&
            typeProfofile !== "politico" &&
            typeProfofile !== "instituicao";
        if (ischecked)
            throw new api_error_1.BadRequestError("você precisa escolher qual tipo de perfil deseja Proseguir!");
        const create = await database_1.default.profiles.create({
            data: {
                name: user.name,
                userId,
                type: typeProfofile,
            },
        });
        res.status(200).json(create);
    }
    async getAllProfile(req, res) {
        const allProfile = await database_1.default.profiles.findMany();
        res.json(allProfile);
    }
    async getProfile(req, res) {
        const { id } = req.params;
        const profile = await database_1.default.profiles.findUnique({ where: { id: +id } });
        if (!profile)
            throw new api_error_1.BadRequestError("Perfil não encontrado");
        res.json(profile);
    }
    async updateProfile(req, res) {
        const { name, userName, bio, photo, interests, urlWebsite } = req.body;
        const { id } = req.params;
        const existProfile = await database_1.default.profiles.findUnique({
            where: { id: +id },
        });
        if (!existProfile)
            throw new api_error_1.InvalidFormatError("Informe um perfil valido!");
        const newData = {
            name,
            userName,
            bio,
            photo,
            interests,
            urlWebsite,
        };
        const dataUpdate = await database_1.default.profiles.update({
            data: newData,
            where: { id: +id },
        });
        res.json(dataUpdate);
    }
}
exports.default = Profile;
// zeZN%$Wi6-QBUnT
