import { Router } from "express";
import PublicationController from "../../controllers/publications";

const publicationsRouter = Router();

publicationsRouter.post(
  "/publications",
  new PublicationController().createPublication
);
publicationsRouter.get(
  "/publications/:id",
  new PublicationController().getPublication
);
publicationsRouter.put(
  "/publications/:id",
  new PublicationController().editPublication
);
publicationsRouter.delete(
  "/publications/:id",
  new PublicationController().deletePublication
);
publicationsRouter.get(
  "/feed/:index",
  new PublicationController().listPublications
);

export default publicationsRouter;
