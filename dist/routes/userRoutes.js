"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const adminController_1 = __importDefault(require("../controllers/adminController"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('USER ROUTES OK!!!');
            //res.render("partials/principal");
        });
        // this.router.get('/list',userController.listar);
        //  this.router.get('/usuario-nro/:id', adminController.buscarUsuarioPorID);
        //Crud Perfil de usuario (TAREAS DE USUARIO)
        this.router.get('/listado', adminController_1.default.listar);
        this.router.get('/datos/:id', userController_1.default.traerData_);
        //  this.router.get('/data/:id', userController.traerData);
        this.router.put('/perfil/:id', userController_1.default.actualizarData);
        //Crud usuarios (TAREAS DEL ADMIN)
        this.router.get('/listado', adminController_1.default.listar);
        this.router.get('/profile/:id', adminController_1.default.buscarUsuarioPorID);
        this.router.get('/usuario/:dni', adminController_1.default.buscarUsuarioPorDNI);
        this.router.delete('/usuario-eliminar/:id', adminController_1.default.eliminarUsuario);
        // this.router.post('/add', authController.addUser);
        // this.router.put('/change-password/:id', userController.modificarPassword)
        // this.router.put('/update', userController.update);
    }
}
//Exportamos el enrutador con 
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRoutes.js.map