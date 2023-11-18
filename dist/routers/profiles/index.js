"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profiles_1 = __importDefault(require("../../controllers/profiles"));
const routerProfile = (0, express_1.Router)();
routerProfile.post("/profile/create", new profiles_1.default().createProfile);
routerProfile.get("/profile", new profiles_1.default().getAllProfile);
routerProfile.get("/profile/:id", new profiles_1.default().getProfile);
routerProfile.put("/profile/update/:id", new profiles_1.default().updateProfile);
exports.default = routerProfile;
