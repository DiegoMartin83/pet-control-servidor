"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../lib/verifyToken");
const adminController_1 = __importDefault(require("../controllers/adminController"));
class AfiliadosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Clientes routes OK!!!');
            //res.render("partials/principal");
        });
        //Crud afiliados (TAREAS DEL ADMIN)
        this.router.get('/nro/:id', adminController_1.default.buscarUsuarioPorID);
        this.router.get('/listado', adminController_1.default.listadoAfiliados);
        this.router.get('/buscar/:apellido', adminController_1.default.buscarAfiliadoPorApellido);
        this.router.get('/buscar-documento/:dni', adminController_1.default.buscarAfiliadoPorDNI);
        this.router.post('/alta', verifyToken_1.validationToken, adminController_1.default.altaAfiliado);
        this.router.delete('/remover/:id', verifyToken_1.validationToken, adminController_1.default.eliminarAfiliado);
        // this.router.delete('/remover/:id',  adminController.eliminarAfiliado);
        this.router.get('/correo/:email', adminController_1.default.buscarAfiliadoPorMail);
        this.router.put('/modificar/:id', adminController_1.default.modificarAfiliado);
    }
}
//Exportamos el enrutador con 
const afiliadosRoutes = new AfiliadosRoutes();
exports.default = afiliadosRoutes.router;
//# sourceMappingURL=afiliadosRoutes.js.map