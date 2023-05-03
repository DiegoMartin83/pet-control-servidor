"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class EstudiosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Estudios routes OK!!!');
            //res.render("partials/principal");
        });
    }
}
//Exportamos el enrutador con 
const estudiosRoutes = new EstudiosRoutes();
exports.default = estudiosRoutes.router;
//# sourceMappingURL=estudiosRoutes.js.map