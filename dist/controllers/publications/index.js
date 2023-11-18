"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const api_error_1 = require("../../helpers/api-error");
class PublicationController {
    async createPublication(req, res) {
        const { profileId, file, description } = req.body;
        const userProfile = await database_1.default.profiles.findUnique({
            where: { id: parseInt(profileId) },
        });
        if (!userProfile)
            throw new api_error_1.BadRequestError("perfil não encontrado");
        const date = new Date();
        const publication = await database_1.default.publications.create({
            data: {
                profileId,
                name: userProfile.name,
                userName: userProfile.userName,
                photo: userProfile === null || userProfile === void 0 ? void 0 : userProfile.photo,
                profileChecked: userProfile.profileChecked,
                date,
                file,
                description
            },
        });
        return res.json(publication);
    }
    async getPublication(req, res) {
        const id = req.params.id;
        const publication = await database_1.default.publications.findUnique({
            where: { id: parseInt(id) },
        });
        if (!publication)
            throw new api_error_1.NotFoundError("Publicação não encontrada!");
        return res.json(publication);
    }
    async listPublications(req, res) {
        const { index } = req.params;
        const page = Number(index);
        const publication = await database_1.default.publications.findMany({
            skip: (page - 1) * 10,
            take: 10,
        });
        if (!publication)
            throw new api_error_1.NotFoundError("Nenhuma publicação encontrada!");
        return res.json(publication);
    }
    async editPublication(req, res) {
        const id = req.params.id;
        const { file, description } = req.body;
        const verifyPublication = await database_1.default.publications.findUnique({
            where: { id: parseInt(id) },
        });
        if (!verifyPublication)
            throw new api_error_1.NotFoundError("Publicação não encontrada!");
        const publication = await database_1.default.publications.update({
            where: { id: parseInt(id) },
            data: {
                description,
                file,
            },
        });
        return res.json(publication);
    }
    async deletePublication(req, res) {
        const id = req.params.id;
        const publication = await database_1.default.publications.findUnique({
            where: { id: parseInt(id) },
        });
        if (!publication)
            throw new api_error_1.NotFoundError("Publicação não encontrada!");
        await database_1.default.publications.delete({
            where: { id: parseInt(id) },
        });
        return res.send();
    }
}
exports.default = PublicationController;
