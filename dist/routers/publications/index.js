"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publications_1 = __importDefault(require("../../controllers/publications"));
const publicationsRouter = (0, express_1.Router)();
publicationsRouter.post("/publications", new publications_1.default().createPublication);
publicationsRouter.get("/publications/:id", new publications_1.default().getPublication);
publicationsRouter.put("/publications/:id", new publications_1.default().editPublication);
publicationsRouter.delete("/publications/:id", new publications_1.default().deletePublication);
publicationsRouter.get("/feed/:index", new publications_1.default().listPublications);
exports.default = publicationsRouter;
