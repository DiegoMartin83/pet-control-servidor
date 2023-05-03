"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            req.session.auth = false;
            req.session.user = {};
            res.send('Auth ROUTES OK!!!');
            //res.render("partials/principal");
        });
        this.router.post('/signin', authController_1.default.login);
        this.router.post('/signup', authController_1.default.addUser);
        this.router.put('/forgot', authController_1.default.restorePwd);
    }
}
//Exportamos el enrutador con 
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
//# sourceMappingURL=authRoutes.js.map