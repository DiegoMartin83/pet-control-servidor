"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
class MascotasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Mascotas routes ok!!!');
            //res.render("partials/principal");
        });
        //this.router.get('/listado', userController.listarMascotas);
        this.router.post('/alta', userController_1.default.altaMascota);
        this.router.get('/listado', userController_1.default.listarMascotas);
        this.router.get('/especie/:especie', userController_1.default.buscarMascotaPorEspecie);
        this.router.get('/afiliado-mascota', userController_1.default.traerMascotaPorIdAfiliado);
        this.router.get('/mascota-afiliado/:id', userController_1.default.buscarMascotaPorIdAfiliado);
        this.router.get('/animal-nro/:id', userController_1.default.buscarMascotaPorId);
        this.router.put('/actualizar/:id', userController_1.default.actualizarMascota);
        this.router.delete('/delete/:id', userController_1.default.eliminarMascota);
    }
}
//Exports del Router 
const mascotasRoutes = new MascotasRoutes();
exports.default = mascotasRoutes.router;
//# sourceMappingURL=mascotasRoutes.js.map