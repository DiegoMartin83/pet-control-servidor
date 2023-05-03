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
const afiliadosModel_1 = __importDefault(require("../models/afiliadosModel"));
class AdminController {
    // public async eliminarUsuario(req: Request, res: Response) {
    //     const { id } = req.params;
    //     const result = await userModel.deleteUser(id);
    //     return result;
    // }
    // public async update(req: Request, res: Response) {
    //     console.log(req.body);
    //     const { id } = req.params;
    //     const result = await userModel.actualizar(req.body, id);
    //     return res.json({ text: 'updating a user ' + id });
    // }
    //************************************/
    //       Control Usuarios            */
    //************************************/
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listado = yield userModel_1.default.list();
            return res.status(200).json(listado);
        });
    }
    buscarUsuarioPorDNI(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.dni);
            const { dni } = req.params;
            const usuario = yield userModel_1.default.findUserByDNI(dni);
            if (usuario) {
                return res.status(200).json(usuario);
            }
            res.status(404).json({ message: "No se encontraron usuarios registrados con el numero ingresado" });
        });
    }
    buscarUsuarioPorID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // if(!req.session.admin){
            //     req.session.admin=false;
            //     return res.status(404).json({message: 'Debes ser administrador para realizar esta acción!'});
            //     // console.log(req.body);
            // }
            //else{
            const { id } = req.params;
            const found = yield userModel_1.default.findUserByID(id);
            if (found) {
                return res.status(200).json(found);
            }
            res.status(404).json({ message: 'No se encontraron usuarios registrados con el numero ingresado' });
            //}
        });
    }
    eliminarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //    const {find} = req.params;
            //    const usuario = await userModel.findUserByID(find)
            //    if(usuario){
            try {
                const { id } = req.params;
                const result = yield userModel_1.default.deleteUser(id);
                console.log(result);
                return res.status(200).json({ message: 'El usuario ha sido removido con éxito!' });
            }
            catch (err) {
                return res.status(500).json({ message: 'Ha ocurrido un error inresperado :/' });
            }
            //}
            //    if(!usuario){
            //     res.status(404).json({message:'No se encontraron usuarios registrados con el numero ingresado'});
            //    }
            // if(!req.session.admin){
            //     req.session.admin=false;
            //     return res.status(404).json({message: 'Debes ser administrador para realizar esta acción!'});
            //     // console.log(req.body);
            // }
            //else{ 
            // } 
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield userModel_1.default.findUserByID(id);
            try {
                if (usuario) {
                    return;
                }
            }
            catch (err) {
                return res.status(400).json({ message: 'Ha ocurrido un error inesperado :/', err });
            }
        });
    }
    // public async list(req: Request, res: Response) {
    //       console.log(req.body);
    //       console.log(req.header("Authorization"));
    //       const usuarios = await userModel.list();
    //       return res.json(usuarios);
    // }
    // public async procesar(req: Request, res: Response) {
    //     if (!req.session.auth) {
    //         req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
    //         res.redirect("./error");
    //     }
    //     let usuario = req.body.usuario;
    //     var usuarios: any = [];
    //     console.log(usuario);
    //     if (usuario !== undefined) {
    //         for (let elemento of usuario) {
    //             const encontrado = await userModel.findByID(elemento);
    //             if (encontrado) {
    //                 usuarios.push(encontrado);
    //             }
    //         }
    //     }
    //     console.log(usuarios);
    //     res.render("partials/seleccion", { usuarios, home: req.session.user, mi_session: true });
    // }
    //************************************/
    //       Control Afiliados           */
    //************************************/
    listadoAfiliados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*   console.log(req.body);
              console.log(req.header("Authorization")); */ //Observamos el valor del token
            const afiliados = yield afiliadosModel_1.default.listarAfiliados();
            return res.json(afiliados);
        });
    }
    altaAfiliado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const afiliado = req.body;
                const result = yield afiliadosModel_1.default.create(afiliado);
                console.log(afiliado);
                return res.status(200).json({ message: 'Se ha dado de alta al afiliado: ', result });
            }
            catch (e) {
                return res.status(403).json({ message: 'Ha ocurrido un error inesperado!', e });
            }
        });
    }
    buscarAfiliadoPorMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const result = yield afiliadosModel_1.default.getAfiByMail(email);
            console.log(req.params);
            console.log(req.body);
            console.log(email);
            console.log(result);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(404).json({ message: 'No se encontraron afiliados al mail ingresado!' });
            }
        });
    }
    buscarAfiliadoPorDNI(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dni } = req.params;
            const result = yield afiliadosModel_1.default.findAfiByDocument(dni);
            try {
                if (result) {
                    return res.status(200).json(result);
                }
                // return res.status(404).json({message:'No se encontraron afiliados con el documento ingresado'});
            }
            catch (err) {
                return res.status(400).json({ message: 'Ha ocurrido un error inesperado :/ ' });
            }
        });
    }
    buscarAfiliadoPorApellido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { apellido } = req.params;
            const result = yield afiliadosModel_1.default.findAfiBySurname(apellido);
            try {
                if (result) {
                    return res.status(200).json(result);
                }
                return res.status(404).json({ message: 'No hay ningun afiliado con el apellido ingresado!' });
            }
            catch (error) {
                return res.status(400).json({ message: 'Ha ocurrido un error inesperado :/' });
            }
        });
    }
    eliminarAfiliado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // if(!req.session.admin){
            //     req.session.admin=false;
            //     return res.status(404).json({message: 'Debes ser administrador para realizar esta acción!'})
            //     // console.log(req.body);
            // }
            const { id } = req.params;
            const result = yield afiliadosModel_1.default.eliminar(id);
            return res.status(200).json({ message: 'El afiliado ha sido removido con éxito!' });
        });
    }
    modificarAfiliado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield afiliadosModel_1.default.updateAfiliado(req.body, id);
            try {
                if (result) {
                    return res.status(200).json({ message: 'El afiliado ha sido actualizado con éxito' });
                }
            }
            catch (err) {
                return res.status(400).json({ message: 'Ha ocurrido un error inesperado :/', err });
            }
        });
    }
    endSession(req, res) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }
}
const adminController = new AdminController();
exports.default = adminController;
// import { Request, Response } from 'express';
// import userModel from '../models/userModel';
// import afiliadosModel from '../models/afiliadosModel';
// import jwt from "jsonwebtoken";
// class AdminController {
// // public async eliminarUsuario(req: Request, res: Response) {
// //     const { id } = req.params;
// //     const result = await userModel.deleteUser(id);
// //     return result;
// // }
//     // public async update(req: Request, res: Response) {
//     //     console.log(req.body);
//     //     const { id } = req.params;
//     //     const result = await userModel.actualizar(req.body, id);
//     //     return res.json({ text: 'updating a user ' + id });
//     // }
//     //************************************/
//     //       Control Usuarios            */
//     //************************************/
//     public async listar (req: Request, res: Response){
//         const listado = await userModel.list();
//         return res.status(200).json(listado);
//     }
//     public async buscarUsuarioPorDNI(req: Request, res: Response) {
//         console.log(req.params.dni);
//         const { dni } = req.params;
//         const usuario = await userModel.findUserByDNI(dni);
//         if (usuario){
//             return res.status(200).json(usuario);
//         }
//         res.status(404).json({ message: "No se encontraron usuarios registrados con el numero ingresado" });
//     }
//     public async buscarUsuarioPorID(req: Request, res: Response){
//         // if(!req.session.admin){
//         //     req.session.admin=false;
//         //     return res.status(404).json({message: 'Debes ser administrador para realizar esta acción!'});
//         //     // console.log(req.body);
//         // }
//         //else{
//             const {id} = req.params;
//             const found = await userModel.findUserByID(id);
//             if(found){
//             return res.status(200).json(found);
//             }
//             res.status(404).json({message:'No se encontraron usuarios registrados con el numero ingresado'});
//         //}
//     }
//     public async eliminarUsuario(req:Request,res:Response){
//     //    const {find} = req.params;
//     //    const usuario = await userModel.findUserByID(find)
//     //    if(usuario){
//     try{
//         const { id } = req.params; 
//         const result = await userModel.deleteUser(id);
//         console.log(result);
//         return res.status(200).json({ message: 'El usuario ha sido removido con éxito!' });
//     }catch(err){
//             return res.status(500).json({ message:'Ha ocurrido un error inresperado :/'})
//     }
//        //}
//     //    if(!usuario){
//     //     res.status(404).json({message:'No se encontraron usuarios registrados con el numero ingresado'});
//     //    }
//         // if(!req.session.admin){
//         //     req.session.admin=false;
//         //     return res.status(404).json({message: 'Debes ser administrador para realizar esta acción!'});
//         //     // console.log(req.body);
//         // }
//         //else{ 
//           // } 
//     }
//     public async actualizar(req: Request, res: Response){
//         const {id} = req.params;
//         const usuario = await userModel.findUserByID(id)
//         try{
//             if(usuario){
//                 return 
//             }
//         }catch(err){
//             return res.status(400).json({message:'Ha ocurrido un error inesperado :/', err});
//         }
//     }
//     // public async list(req: Request, res: Response) {
//     //       console.log(req.body);
//     //       console.log(req.header("Authorization"));
//     //       const usuarios = await userModel.list();
//     //       return res.json(usuarios);
//     // }
//     // public async procesar(req: Request, res: Response) {
//     //     if (!req.session.auth) {
//     //         req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
//     //         res.redirect("./error");
//     //     }
//     //     let usuario = req.body.usuario;
//     //     var usuarios: any = [];
//     //     console.log(usuario);
//     //     if (usuario !== undefined) {
//     //         for (let elemento of usuario) {
//     //             const encontrado = await userModel.findByID(elemento);
//     //             if (encontrado) {
//     //                 usuarios.push(encontrado);
//     //             }
//     //         }
//     //     }
//     //     console.log(usuarios);
//     //     res.render("partials/seleccion", { usuarios, home: req.session.user, mi_session: true });
//     // }
//     //************************************/
//     //       Control Afiliados           */
//     //************************************/
//     public async listadoAfiliados(req: Request, res: Response) {
//         /*   console.log(req.body);
//           console.log(req.header("Authorization")); *///Observamos el valor del token
//         const afiliados = await afiliadosModel.listarAfiliados();
//         return res.json(afiliados);
//     }
//     public async altaAfiliado(req:Request, res: Response){
//         // if (!req.session.auth){
//         //     req.session.auth=false;
//         //     return res.status(400).json({message:"Acceso denegado!"})
//         // }else {
//             if(!req.session.admin){
//                 req.session.admin=false;
//                 return res.status(404).json({message: 'Sección restringida solo para administradores!'})
//                 // console.log(req.body);
//             } else {
//                 try{ 
//                     const afiliado = req.body;
//                     const result = await afiliadosModel.create(afiliado);
//                     console.log(afiliado);
//                     return res.status(200).json({message: 'Se ha dado de alta al afiliado: ' , result});
//                 }catch(e){
//                     return res.status(403).json({message: 'Ha ocurrido un error inesperado!', e})
//                 }
//             }
//         // }
//     }
//     public async buscarAfiliadoPorMail(req: Request, res: Response){
//         const {email} = req.params;
//         const result = await afiliadosModel.getAfiByMail(email);
//         console.log(req.params);
//         console.log(req.body);
//         console.log(email);
//         console.log(result);
//         if(result){
//             return res.status(200).json(result);
//         }
//         else{
//             return res.status(404).json({message:'No se encontraron afiliados al mail ingresado!'})
//         }
//     }
//     public async buscarAfiliadoPorDNI(req: Request, res: Response){
//         const {dni} = req.params;
//         const result= await afiliadosModel.findAfiByDocument(dni);
//         try {
//             if(result){
//                 return res.status(200).json(result)
//             }
//             // return res.status(404).json({message:'No se encontraron afiliados con el documento ingresado'});
//         }catch(err){
//             return res.status(400).json({message:'Ha ocurrido un error inesperado :/ '});
//         }
//     }
//     public async buscarAfiliadoPorApellido (req: Request, res: Response){
//         const {apellido} = req.params;
//         const result = await afiliadosModel.findAfiBySurname(apellido);
//         try{
//             if(result){
//                 return res.status(200).json(result);
//             }
//             return res.status(404).json({message:'No hay ningun afiliado con el apellido ingresado!'})
//         }catch(error){
//             return res.status(400).json({message: 'Ha ocurrido un error inesperado :/'});
//         }
//     }
//     public async eliminarAfiliado(req:Request,res:Response){
//         // if(!req.session.admin){
//         //     req.session.admin=false;
//         //     return res.status(404).json({message: 'Debes ser administrador para realizar esta acción!'})
//         //     // console.log(req.body);
//         // }
//         // else{ 
//         //      const { id } = req.params; 
//         //      const result = await afiliadosModel.eliminar(id);
//         //      return res.status(200).json({ message: 'El afiliado ha sido removido con éxito!' });
//         //    }
//         if (!req.session.user || !req.session.admin){
//             return res.status(400).json({message:"Acceso denegado!"})
//         }else {
//             if(!req.session.admin){
//                 req.session.admin=false;
//                 return res.status(404).json({message: 'Sección restringida solo para administradores!'})
//                 // console.log(req.body);
//             } else {
//                 try{ 
//                     const { id } = req.params; 
//                     const result = await afiliadosModel.eliminar(id);
//                     console.log(result);
//                     return res.status(200).json({ message: 'El afiliado ha sido removido con éxito!' });
//                 }catch(e){
//                     return res.status(403).json({message: 'Ha ocurrido un error inesperado!', e})
//                 }
//             }
//         }
//     }
//     public async modificarAfiliado(req: Request, res: Response){
//         const {id} = req.params;
//         const result = await afiliadosModel.updateAfiliado(req.body,id);
//         try { 
//             if(result){
//                 return res.status(200).json({ message:'El afiliado ha sido actualizado con éxito'})
//             }
//         }catch(err){
//             return res.status(400).json({message:'Ha ocurrido un error inesperado :/', err});
//         }
//     }
//     public endSession(req: Request, res: Response) {
//         console.log(req.body);
//         req.session.user = {};
//         req.session.auth = false;
//         req.session.destroy(() => console.log("Session finalizada"));
//         res.redirect("/");
//     }
// }
// const adminController = new AdminController();
// export default adminController;
//# sourceMappingURL=adminController.js.map