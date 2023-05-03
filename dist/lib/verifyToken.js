"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationToken = void 0;
//import jwt from "jsonwebtoken";
const validationToken = (req, res, next) => {
    var _a;
    //Recuperamos la cabecera y la dividimos en 2
    let token = ((_a = req.header("token")) === null || _a === void 0 ? void 0 : _a.split('Baerer ', 2));
    //tomamos la parte que nos interesa, el token, para despues evaluar.
    // token = token['1'];
    console.log("Evaluando token ingresado...");
    console.log(token);
    if (!token)
        return res.status(401).json("Acceso denegado, debes estar logueado para acceder a  la operación que estás intentando realizar!!");
    next();
};
exports.validationToken = validationToken;
//# sourceMappingURL=verifyToken.js.map