import { Request, Response } from "express";
import { prisma } from "../../dataBase/dataBase";
import { NotFoundError } from "../../helpers/api-error"


export class EditPublicationController {
    async getPublication(req: Request, res: Response) {
        const id = req.params.id;
        const { file, description, } = req.body;

        const verifyPublication = await prisma.publication.findUnique({
            where: { id: parseInt(id) }
        })

        if (!verifyPublication) throw new NotFoundError("Publicação não encontrada!")

        const publication = await prisma.publication.update({
            where: { id: parseInt(id) },
            data: {
                description,
                file
            }
        })

        return res.json(publication)
    }
}