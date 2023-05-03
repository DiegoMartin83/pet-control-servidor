"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
// import {verifyToken} from '.' 
class TurnosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Turnos routes ok!!!');
            //res.render("partials/principal");
        });
        //this.router.get('/listado', [tokenValidation, checkRol='Admin'], turnosController.listadoturnos);
        // this.router.get('/listado', validationToken , turnosController.listadoturnos);
        // this.router.post('/nuevo', validationToken , turnosController.nuevoTurno);
        // this.router.put('/modificar/:id',validationToken ,  userController.updateTurn);
        this.router.post('/nuevo', userController_1.default.asignarTurno);
        this.router.get('/veterinario/:id', userController_1.default.buscarTurnoPorProfesional);
        this.router.get('/turno-mascota/:id', userController_1.default.buscarTurnoPorIdMascota);
        this.router.get('/listado', userController_1.default.listadoTurnos);
        // this.router.get('/listado',[validationToken], userController.listadoTurnos);
        this.router.get('/visita-nro/:id', userController_1.default.buscarTurnosPorId);
        this.router.get('/turno-nombre/:nombre', userController_1.default.buscarTurnoPorNombre);
        this.router.put('/modificar/:id', userController_1.default.modificarTurno);
        this.router.put('/modificar/:id', userController_1.default.modificarTurno);
        this.router.delete('/eliminar-turno/:id', userController_1.default.eliminarTurno);
        this.router.delete('/eliminar-turnos', userController_1.default.eliminarTurnos);
    }
}
//Exportamos el enrutador con 
const turnosRoutes = new TurnosRoutes();
exports.default = turnosRoutes.router;
//# sourceMappingURL=turnosRoutes.js.map