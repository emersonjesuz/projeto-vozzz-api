"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const profiles_1 = __importDefault(require("./profiles"));
const publications_1 = __importDefault(require("./publications"));
const router = (0, express_1.Router)();
router.use(users_1.default);
router.use(profiles_1.default);
router.use(publications_1.default);
exports.default = router;
