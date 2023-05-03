"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSpeciality = void 0;
const checkSpeciality = (speciality) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { tipo } = req.session.veterinario;
            if (req.session.veterinario) {
                if (tipo == speciality) {
                    next();
                }
                else if (req.session.administrativo) {
                    return res.status(401).json({ message: "Sección exclusiva de veterinarios!" });
                }
            }
            else {
                return res.status(404).json({ message: "Ha ocurrido un error inesperado!" });
            }
        }
        catch (e) {
            return res.status(404).json({ message: 'No está autenticado!' });
        }
    });
};
exports.checkSpeciality = checkSpeciality;
//# sourceMappingURL=verifyEspeciality.js.map