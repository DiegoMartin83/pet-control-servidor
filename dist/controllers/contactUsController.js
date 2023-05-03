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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailer_1 = require("../config/mailer");
const contactUsModel_1 = __importDefault(require("../models/contactUsModel"));
class ContactUsController {
    createContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            // const contacto = {  
            //     "nombreyapellido": req.body.nombreyapellido,
            //     "email": req.body.email,
            //     "telefono": req.body.telefono,
            //     "consulta": req.body.consulta
            // };
            const contacto = {
                "nombreyapellido": req.body.nombreyapellido,
                "email": req.body.email,
                "consulta": req.body.consulta,
                "telefono": req.body.telefono
            };
            const result = yield contactUsModel_1.default.crearConsulta(contacto);
            console.log(result);
            if (!result)
                return res.status(404).json({ message: "Algo salió mal :/" });
            else {
                res.status(200).json({ message: "Consulta enviada con éxito!!!" });
                try {
                    yield mailer_1.transporter.sendMail({
                        from: `${usuario.email}`,
                        to: ' <info@petcontrolsoftware.com>',
                        subject: `Nueva consulta ingresada del usuario  ${usuario.nombre} ${usuario.apellido}`,
                        html: `${usuario.consulta}`
                    });
                    //Vemos el estado del correo
                    console.log(mailer_1.transporter);
                }
                catch (err) {
                    console.log("error:", err);
                }
            }
        });
    }
    listContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield contactUsModel_1.default.listarConsultas();
            res.render("partials/formTurnos", { result });
            // return res.json(result)
        });
    }
    eliminarConsulta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield contactUsModel_1.default.deleteQuery(id);
            return res.status(200).json({ message: 'La consulta ha sido removida de la base de datos!' });
        });
    }
}
const contactUsController = new ContactUsController();
exports.default = contactUsController;
//# sourceMappingURL=contactUsController.js.map