"use strict";
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.variables = void 0;
require("dotenv/config");
exports.variables = {
    jwtPassword: (_a = process.env.JWT_PASSWORD) !== null && _a !== void 0 ? _a : "",
    dbHost: (_b = process.env.DB_HOST) !== null && _b !== void 0 ? _b : "",
    dbPort: (_c = process.env.DB_PORT) !== null && _c !== void 0 ? _c : "",
    dbUser: (_d = process.env.DB_USER) !== null && _d !== void 0 ? _d : "",
    dbPassword: (_e = process.env.DB_PASSWORD) !== null && _e !== void 0 ? _e : "",
    dbDatabase: (_f = process.env.DB_DATABASE) !== null && _f !== void 0 ? _f : "",
    port: (_g = process.env.PORT) !== null && _g !== void 0 ? _g : "3000",
};
