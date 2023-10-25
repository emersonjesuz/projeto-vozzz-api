import { Router } from "express";
import Profile from "../../controllers/profiles";

const routerProfile = Router();

routerProfile.post("/profile/create", new Profile().createProfile);
routerProfile.get("/profile", new Profile().getAllProfile);
routerProfile.get("/profile/:id", new Profile().getProfile);
routerProfile.put("/profile/update/:id", new Profile().updateProfile);

export default routerProfile;
