import { Router } from "express";
import { CreatePublicationController } from "../controllers/publicationsControllers/CreatePublicationController";
import { GetPublicationController } from "../controllers/publicationsControllers/GetPublicationController";
import { DeletePublicationController } from "../controllers/publicationsControllers/DeletePublicationController";
import { EditPublicationController } from "../controllers/publicationsControllers/EditPublicationCrontroller";
import { ListPublicationController } from "../controllers/publicationsControllers/ListPublicationController";

const publicationsRouter = Router();

publicationsRouter.post('/publications', new CreatePublicationController().createPublication)
publicationsRouter.get('/publications/:id', new GetPublicationController().getPublication)
publicationsRouter.put('/publications/:id', new EditPublicationController().getPublication)
publicationsRouter.delete('/publications/:id', new DeletePublicationController().getPublication)
publicationsRouter.get('/feed', new ListPublicationController().getPublication)


export default publicationsRouter;