import { Router } from "express";
import Profile from "../../controllers/profiles";

const routerProfile = Router();

routerProfile.post("/profile/create", new Profile().createProfile);

export default routerProfile;
