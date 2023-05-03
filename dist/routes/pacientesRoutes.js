"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class PacientesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Pacientes routes ok!!!');
            //res.render("partials/principal");
        });
    }
}
//Exportamos el enrutador con 
const pacientesRoutes = new PacientesRoutes();
exports.default = pacientesRoutes.router;
//# sourceMappingURL=pacientesRoutes.js.map