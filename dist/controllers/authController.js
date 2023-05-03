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
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//const nodemailer = require('nodemailer');
const mailer_1 = require("../config/mailer");
const config_1 = __importDefault(require("../config/config"));
const dtenv = require('dotenv');
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, password } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield userModel_1.default.findMail(usuario);
            console.log(usuario, password);
            if (!result) {
                console.log(result);
                return res.status(404).json({ message: "Usuario y/o contraseña incorrectos!!" });
            }
            else {
                const passOk = yield userModel_1.default.validarPassword(password, result.password);
                if (result.password == password && result.email == usuario) {
                    if ((result === null || result === void 0 ? void 0 : result.rol) === "admin") {
                        req.session.admin = true;
                        // res.status(200).json({mssagge:"login admin ok!"});
                    }
                    req.session.admin = false;
                    if ((result === null || result === void 0 ? void 0 : result.perfil) === 'Administrativo') {
                        console.log("resultado", result);
                        req.session.administrativo = true;
                        const token = jsonwebtoken_1.default.sign({ _id: result.id, perfil: "Adm" }, config_1.default.SECRETORPRIVATEKEY, { expiresIn: '1h' });
                        return res.status(200).json({ mssagge: "Bienvenido " + result.nombre, token: token, rol: result.rol, perfil: result.perfil, id: result.id });
                    }
                    if ((result === null || result === void 0 ? void 0 : result.perfil) === 'Veterinario') {
                        console.log("resultado", result);
                        req.session.administrativo = true;
                        const token = jsonwebtoken_1.default.sign({ _id: result.id, perfil: "Vet" }, config_1.default.SECRETORPRIVATEKEY, { expiresIn: '1h' });
                        return res.status(200).json({ mssagge: "Bienvenido " + result.nombre, token: token, rol: result.rol, perfil: result.perfil, id: result.id });
                    }
                    //  res.status(200).json({mssagge:"login user ok!"});
                    console.log("resultado", result);
                    const token = jsonwebtoken_1.default.sign({ _id: result.id }, config_1.default.SECRETORPRIVATEKEY, { expiresIn: '1h' });
                    return res.status(200).json({ message: " Bienvenido" + result.nombre, token: token, rol: result.rol, perfil: result.perfil, id: result.id });
                }
                if (result.email != usuario || result.password != password) {
                    return res.status(403).json({ message: "Usuario y/o contraseña incorrectos!!" });
                }
                console.log(res);
            }
        });
    }
    restorePwd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.params;
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            delete usuario.repassword;
            console.log(req.body);
            const patternName = /^[A-Z][A-Za-z]{3,14}$/;
            const patternSurname = /^[A-Z][A-Za-z]{3,14}$/;
            const patternPass = /^[A-Z][A-Za-z0-9]{6,20}$/;
            const patternMail = /[a-z0-9]{1,14}@[a-z0-9]{1,10}.[a-z]{2,3}/;
            const patternDOC = /^[0-9]{7,9}$/;
            const patternTel = /^[0-9]{8,10}$/;
            const patternCel = /^[0-9]{8,10}$/;
            const patternFile = /^[0-9]{7,9}$/;
            const patternEnroll = /^[0-9]{7,9}$/;
            //     	//MAIL
            // if ((usuario.email.length == 0)){
            // 	return res.status(403).json({ message: "No ha ingresado ningun MAIL!!" });
            // }
            // if ((usuario.email.length > 27)){
            // 	return res.status(403).json({ message: "Excedió el limite maximo(27) de caracteres para el campo MAIL!!" });
            // }
            // if ((usuario.email.length < 5)){
            // 	return res.status(403).json({ message: "El campo debe contener al menos 5 caracteres" });
            // }
            // if (!patternMail.test(usuario.email)){
            // 	return res.status(403).json({ message: "Formato no válido de correo, el formato debe ser ejemplo@mail.com"});
            // }
            // 	//FUNCIONAN LAS VALIDACIONES
            // 	// FIN MAIL
            //CONTRASEÑA
            if ((usuario.password.length == 0)) {
                return res.status(403).json({ message: "No ha ingresado ninguna CONTRASEÑA!!" });
            }
            if ((usuario.password.length > 20)) {
                return res.status(403).json({ message: "Excedió el limite maximo (20) de caracteres para el campo CONTRASEÑA!!" });
            }
            if ((usuario.password.length < 6)) {
                return res.status(403).json({ message: "La contraseña debe de contener entre 6 y 20 caracteres!!" });
            }
            if (!patternPass.test(usuario.password)) {
                return res.status(403).json({ message: "Clave inválida!!, debe contener al menos un numero y una mayúscula" });
            }
            // 	//FUNCIONAN LAS VALIDACIONES
            // 	// FIN CONTRASEÑA
            // 	 //NOMBRE
            // 	 if (usuario.nombre.length == 0) {
            // 	 	res.status(403).json({ error: "No ha ingresado ningun nombre!!" });
            //  }
            // 	    if (usuario.nombre.length > 14) {
            // 		res.status(403).json({
            // 			error: "Excedió el limite maximo (14) de caracteres para el campo NOMBRE!!"});
            // 	 }
            // 	 if (usuario.nombre.length < 3) {
            // 	 	res.status(403).json({
            // 	 		error: "Nombre invalido, debe contener entre 3 y 14 caracteres!!"});
            // 	}
            // 	 if (!patternName.test(usuario.nombre)) {
            // 	 	res.status(403).json({error: "Nombre invalido, debe comenzar con mayuscula y no poseer numeros."});
            // 	 }
            // 	// //FUNCIONAN LAS VALIDACIONES		
            // 	// // FIN NOMBRE
            // 	 //APELLIDO
            // 	 if (usuario.apellido.length == 0) {
            // 		 res.status(403).json({error: "No ha ingresado ningun apellido!!" });
            // 	 }
            // 	 if (usuario.apellido.length > 14) {
            // 	 	res.status(403).json({error: "Excedió el limite maximo (14) de caracteres para el campo APELLIDO!!"});
            // 	}
            // 	if (usuario.apellido.length < 3) {
            // 	 	res.status(403).json({error: "Apellido invalido, debe contener entre 3 y 14 caracteres!!"});
            // 	}
            // 	if (!patternSurname.test(usuario.apellido)) {
            // 	res.status(403).json({error: "Apellido invalido, debe comenzar con mayuscula y no poseer numeros."});
            // 	}
            // 	// //FUNCIONAN LAS VALIDACIONES		
            // 	// // FIN APELLIDO
            // 	 //DNI
            if (usuario.dni.length < 1) {
                return res.status(403).json({ message: "No ha ingresado ningun DNI!!" });
            }
            if (usuario.dni.length > 8) {
                return res.status(403).json({ message: "Excedió el limite maximo (8) de digitos para el campo DNI!!" });
            }
            if (usuario.dni.length < 7) {
                return res.status(403).json({ message: "DNI invalido, debe contener entre 7 y 8 digitos!!" });
            }
            if (!patternDOC.test(usuario.dni)) {
                return res.status(403).json({ message: "DNI invalido, debe contener solo numeros, sin puntos ni espacios." });
            }
            // 	// // FIN DNI
            // 	// //TELEFONO
            // if (usuario.telefono.length == 0) {
            // 	res.status(403).json({message: "No ha ingresado ningun telefono!!"});
            // 	}
            // 	if (usuario.telefono.length > 9) {
            // 	 	res.status(403).json({message: "Excedió el limite maximo (10) de digitos para el campo TELEFONO!!"});
            // 	 }
            // 	if (usuario.telefono.length < 8) {
            // 		res.status(403).json({message: "Telefono invalido, debe contener entre 8 y 10 digitos!!"});
            // 	 }
            // 	 if (!patternTel.test(usuario.telefono)) {
            // 	 	res.status(403).json({message: "Telefono invalido, debe contener solo numeros, sin guiones ni espacios."});
            //      }
            // FIN TELEFONO
            //res.send('Usuario agregado!!!');
            const busqueda = yield userModel_1.default.findMail(usuario.email);
            // usuario.password = await userModel.encriptPass(usuario.password);
            if (!busqueda) {
                try {
                    const result = yield userModel_1.default.create(usuario);
                    yield mailer_1.transporter.sendMail({
                        from: '"PET CONTROL 👻" <info@petcontrolsoftware.com>',
                        to: usuario.email,
                        subject: 'Registro PET CONTROL exitoso!!',
                        html: `Hola ${usuario.nombre}, gracias por ustilizar PET CONTROL SOFTWARE Gestion Veterinaria Online,
                        ya podés ingresar a nuestro sitio clickeando el siguiente enlace:
                        <a href="http://localhost:4200/auth/login"> Pet Control Software | Gestión Veterinaria </a>`
                    });
                    console.log(mailer_1.transporter);
                }
                catch (err) {
                    console.log("error:", err);
                }
                return res.status(200).json({ message: 'El usuario se ha registrado con éxito!!!! Usuario: ' + usuario.nombre });
            }
            if (busqueda) {
                return res.status(403).json({ message: "El usuario ya se encuentra registrado!" });
            }
        });
    }
    /* public home(req: Request, res: Response) {
         if (!req.session.auth) {
             // req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
             // res.redirect("./error");
         }
         console.log(req.body);
         
     }*/
    endSession(req, res) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }
}
const authController = new AuthController();
exports.default = authController;
//# sourceMappingURL=authController.js.map