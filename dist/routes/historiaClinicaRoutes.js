"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
class HistoriaClinicaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('HISTORIAS CLINICAS ROUTES OK!!!');
            //res.render("partials/principal");
        });
        this.router.post('/alta', userController_1.default.crearHistoria);
        this.router.get('/listado', userController_1.default.listarFichas);
        this.router.get('/ficha-nro/:id', userController_1.default.listarFichaPorId);
        this.router.put('/actualizar/:id', userController_1.default.modificarHistoria);
        // this.router.get('/consultas', contactUsController.listContacts);
        // this.router.delete('/eliminado/:id', contactUsController.eliminarConsulta);
    }
}
//Exportamos el enrutador con 
const historiaClinicaRoutes = new HistoriaClinicaRoutes();
exports.default = historiaClinicaRoutes.router;
//# sourceMappingURL=historiaClinicaRoutes.js.map