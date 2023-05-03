"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactUsController_1 = __importDefault(require("../controllers/contactUsController"));
class ContactUsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('CONTACT ROUTES OK!!!');
            //res.render("partials/principal");
        });
        this.router.post('/consulta', contactUsController_1.default.createContact);
        this.router.get('/consultas', contactUsController_1.default.listContacts);
        this.router.delete('/eliminado/:id', contactUsController_1.default.eliminarConsulta);
    }
}
//Exportamos el enrutador con 
const contactUsRoutes = new ContactUsRoutes();
exports.default = contactUsRoutes.router;
//# sourceMappingURL=contactUsRoutes.js.map