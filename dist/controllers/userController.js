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
const mascotasModel_1 = __importDefault(require("../models/mascotasModel"));
const turnosModel_1 = __importDefault(require("../models/turnosModel"));
const historiaClinicaModel_1 = __importDefault(require("../models/historiaClinicaModel"));
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
class UserController {
    //registro
    signup(req, res) {
        console.log(req.body);
        //res.send('Sign Up!!!');
        res.render("partials/signupForm");
    }
    // //CRUD
    // public async list (req:Request,res:Response){
    // 	console.log(req.body);
    //     const usuarios = await userModel.listar();
    //     console.log(usuarios);
    //     return res.json(usuarios);
    //     //res.send('Listado de usuarios!!!');
    // }
    // public async find(req:Request,res:Response){
    // 	console.log(req.params.id);
    //     const { id } = req.params;
    //     const usuario = await userModel.findByID(id);
    //     if (usuario)
    //         return res.json(usuario);
    //     res.status(404).json({ text: "User doesn't exists" });
    // }
    //==================================================================================================================================================================
    //***********************************************
    //                Control Afiliados             *
    //***********************************************
    listadoAfiliados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*   console.log(req.body);
              console.log(req.header("Authorization")); */ //Observamos el valor del token
            const afiliados = yield afiliadosModel_1.default.listarAfiliados();
            return res.json(afiliados);
        });
    }
    //==================================================================================================================================================================
    //     TURNOS COMPLETADO  14/07/22
    //***********************************************
    //                Control Turnos                *
    //***********************************************
    //CREA TURNO
    asignarTurno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                const turno = req.body;
                const result = yield turnosModel_1.default.create(turno);
                // console.log(turno);
                //   res.render("partials/testTurno");
                return res.status(200).json({ message: 'Turno agendado con éxito: ', result });
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({ message: "Ha ocurrido un error inesperado :/", error });
            }
        });
    }
    //     public async listadoTurnos(req: Request, res: Response) {
    //         console.log(req.body);
    //         console.log(req.header("Authorization")); ///Observamos el valor del token
    //       const turnos = await turnosModel.listTurns();
    //       console.log(turnos);
    //       return res.json(turnos)
    //       return res.status(200).json(turnos);
    //   }
    //LISTA TURNOS
    listadoTurnos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield turnosModel_1.default.listTurns();
            try {
                if (result) {
                    return res.status(200).json(result);
                }
                return res.status(404).json({ message: 'No se encontraron turnos activos!!' });
            }
            catch (error) {
                return res.status(400).json({ message: 'Ha ocurrido un error inesperado :/', error });
            }
            // try{ 
            // const { usuario, password } = req.body;
            //     const result = await userModel.findMail(usuario);
            //     if(result.rol!="User" || result.rol!="Admin" ){
            //         res.status(403).json({message: "Ups! Parece que estas intentando acceder a una sección exclusiva de usuarios, debes iniciar sesión!"})
            //     }else{
            //         console.log(req.body);
            //         //  console.log(req.header("Authorization")); *///Observamos el valor del token
            //         const turnos = await turnosModel.listTurns();
            //         console.log(turnos);
            //         // return res.json(turnos)
            //         return res.status(200).json(turnos);
            //     }
            // }catch(e){
            //     res.status(400).json({mssagge:'Ha ocurrido un error ineserado :/', e})
            // }
        });
    }
    //  const hc = req.body;
    //  const {id_animal} = req.body;
    //  console.log(id_animal);
    //  console.log(req.body);
    //  console.log(req.params);
    //   const match = await historiaClinicaModel.findClinicFileByPetID(id_animal)
    //   if(match) {
    //      return res.status(403).json({message: 'Ya existe una ficha con el numero de mascota ingresado'});
    //   }
    //  const match2 = await mascotasModel.findPetByID(id_animal);
    // MODIFICA TURNO  
    modificarTurno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield turnosModel_1.default.getTurnById(id);
            console.log(id);
            console.log(req.params);
            try {
                if (!result) {
                    return res.status(400).json({ message: 'No hay turnos activos con el numero ingresado' });
                }
                const { id } = req.params;
                yield turnosModel_1.default.updateTurns(req.body, id);
                return res.status(200).json({ message: "Turno actualizado con éxito!!" });
            }
            catch (err) {
                return res.status(400).json({ message: "Ha ocurrido un error inesperado :/ " });
                console.log(err);
            }
        });
    }
    modificarTurnoaEstado1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield turnosModel_1.default.getTurnById(id);
            console.log(id);
            console.log(req.params);
            try {
                if (!result) {
                    return res.status(400).json({ message: 'No hay turnos activos con el numero ingresado' });
                }
                const { id } = req.params;
                yield turnosModel_1.default.changeStateActive(id);
                return res.status(200).json({ message: "Turno actualizado con éxito!!" });
            }
            catch (err) {
                console.log(err);
                return res.status(400).json({ message: "Ha ocurrido un error inesperado :/ " });
            }
        });
    }
    modificarTurnoaEstado2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield turnosModel_1.default.getTurnById(id);
            console.log(id);
            console.log(req.params);
            try {
                if (!result) {
                    return res.status(400).json({ message: 'No hay turnos activos con el numero ingresado' });
                }
                const { id } = req.params;
                yield turnosModel_1.default.changeStateEnd(id);
                return res.status(200).json({ message: "Turno actualizado con éxito!!" });
            }
            catch (err) {
                console.log(err);
                return res.status(400).json({ message: "Ha ocurrido un error inesperado :/ " });
            }
        });
    }
    modificarTurnoaEstado3(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield turnosModel_1.default.getTurnById(id);
            console.log(id);
            console.log(req.params);
            try {
                if (!result) {
                    return res.status(400).json({ message: 'No hay turnos activos con el numero ingresado' });
                }
                const { id } = req.params;
                yield turnosModel_1.default.changeStateToCancel(id);
                return res.status(200).json({ message: "Turno actualizado con éxito!!" });
            }
            catch (err) {
                console.log(err);
                return res.status(400).json({ message: "Ha ocurrido un error inesperado :/ " });
            }
        });
    }
    modificarTurnoaEstado4(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield turnosModel_1.default.getTurnById(id);
            console.log(id);
            console.log(req.params);
            try {
                if (!result) {
                    return res.status(400).json({ message: 'No hay turnos activos con el numero ingresado' });
                }
                const { id } = req.params;
                yield turnosModel_1.default.changeStatePosp(id);
                return res.status(200).json({ message: "Turno actualizado con éxito!!" });
            }
            catch (err) {
                console.log(err);
                return res.status(400).json({ message: "Ha ocurrido un error inesperado :/ " });
            }
        });
    }
    //BUSCA TURNO POR ID DE VISITA
    buscarTurnosPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //desglose o destructura del objeto
            const { id } = req.params;
            console.log(req.body);
            const found = yield turnosModel_1.default.getTurnById(id);
            try {
                if (found)
                    return res.json(found);
                res.status(400).json({ message: "No se encontraron turnos activos con el número asignado!!" });
            }
            catch (error) {
                return res.status(403).json({ message: 'Ha ocurrido un error inesperado :/', error });
            }
        });
    }
    //  public async buscarTurnoPorNombre(req: Request, res: Response){
    //      const {nombre} = req.params;
    //      const nombreMascota = await mascotasModel.findPetByName(nombre);
    //      if(!nombreMascota){
    //         return res.status(404).json({message:'No se encontraron mascotas registradas con el nombre ingresado'});
    //      }else{
    //         const {nombre_mascota} = req.params;
    //         const turnoNombreMascota = await turnosModel.turnByPetName(nombre_mascota);
    //         return res.json(turnoNombreMascota);
    //      }
    //  }
    //BUSCA TURNO POR NOMBRE DE MASCOTA
    buscarTurnoPorNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            const result = yield turnosModel_1.default.turnByPetName(nombre);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(404).json({ message: 'No hay turnos activos con el nombre de mascota ingresado' });
            }
        });
    }
    //BUSCA TURNO POR ID DE MASCOTA
    buscarTurnoPorIdMascota(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield turnosModel_1.default.getTurnByPetID(id);
            try {
                if (result) {
                    return res.status(200).json(result);
                }
                else {
                    return res.status(400).json({ message: 'No hay turnos activos con el número de mascota ingresado' });
                }
            }
            catch (err) {
                return res.status(403).json({ message: 'Ha ocurrido un error inesperado :/ ' });
            }
        });
    }
    // BUSCA TURNO POR ID DE PROFESIONAL
    buscarTurnoPorProfesional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const found = yield turnosModel_1.default.getTurnByProfID(id);
            try {
                if (found) {
                    return res.status(200).json(found);
                }
                return res.status(403).json({ message: 'No se han encontrado turnos asignados al médico seleccionado' });
            }
            catch (error) {
                return res.status(403).json({ message: 'Ha ocurrido un error inesperado', error });
            }
            //SRC pend
        });
    }
    //INGRESA ESTADO DE TURNO (PENDIENTE, CONSUMADO, CANCELADO)
    estado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { estado } = req.body;
            try {
                const result = yield turnosModel_1.default.state(estado);
                return res.status(200).json({ message: 'Estado de turno cambiado', result });
            }
            catch (err) {
                return res.status(400).json({ message: 'Ha ocurrido un error inesperado!', err });
            }
        });
    }
    //ELIMINA FISICAMENTE TURNO SELECCIONADO POR ID
    eliminarTurno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield turnosModel_1.default.delete(id);
            return res.status(200).json({ message: 'El turno ha sido removido con éxito!' });
        });
    }
    // ELIMINA FISICAMENTE TODOS LOS TURNOS
    eliminarTurnos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const found = yield turnosModel_1.default.listTurns();
                if (found.length > 0) {
                    yield turnosModel_1.default.deleteAllTurns();
                    return res.status(200).json({ message: 'Se ha removido la totalidad de los turnos activos' });
                }
                else {
                    return res.status(400).json({ message: 'No se encontraron turnos activos' });
                }
            }
            catch (e) {
                res.status(404).json({ message: 'A ocurrido un error inesperado :/', e });
            }
        });
    }
    //===========================================================================================================================================================================/
    //*************************************
    //         Control Mascotas           *
    //*************************************
    // DA DE ALTA UNA MASCOTA
    altaMascota(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre } = req.body;
                const { dniDueño } = req.body;
                const match1 = yield mascotasModel_1.default.findPetByName(nombre);
                const match2 = yield mascotasModel_1.default.findPetByDNIonr(dniDueño);
                if (match1) {
                    if (match2) {
                        return res.status(403).json({ message: "La mascota ingresada ya existe en la base de datos del sistema." });
                    }
                }
                else {
                    const mascota = req.body;
                    const result = yield mascotasModel_1.default.create(mascota);
                    console.log(mascota);
                    return res.status(200).json({ message: 'Se ha dado de alta a la mascota: ', result });
                }
            }
            catch (e) {
                return res.status(403).json({ message: 'Ha ocurrido un error inesperado!', e });
            }
        });
    }
    // LISTA TODA LAS MASCOTAS
    listarMascotas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const result = yield mascotasModel_1.default.listPets();
            return res.json(result);
        });
    }
    buscarMascotaPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //desglose o destructura del objeto
            const { id } = req.params;
            console.log(req.body);
            const found = yield mascotasModel_1.default.findPetByID(id);
            try {
                if (found) {
                    return res.status(200).json(found);
                }
                if (!found) {
                    return res.status(403).json({ message: 'No existen mascotas con el numero de identificador ingresado!' });
                }
            }
            catch (error) {
                return res.status(403).json({ message: 'Ha ocurrido un error inesperado :/', error });
            }
        });
    }
    // FILTRA MASCOTA SEGUN ID DE AFILIADO
    traerMascotaPorIdAfiliado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const petAfi = yield mascotasModel_1.default.findMatchPetAfiliado();
            if (petAfi)
                return res.json(petAfi);
            res.status(400).json({ message: "No se encontraron datos!!" });
        });
    }
    //Control actual
    buscarMascotaPorIdAfiliado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const found = yield mascotasModel_1.default.findPetByIDAfi(id);
            try {
                if (found) {
                    return res.status(200).json(found);
                }
                return res.status(404).json({ message: 'No existen mascotas asociadas a ningun afiliado con el número ingresado!' });
                //console.log(first)
            }
            catch (error) {
                return res.status(403).json({ message: 'Ha ocurrido un error inesperado :/', error });
            }
        });
    }
    buscarMascotaPorEspecie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //src pend
            const { especie } = req.params;
            const found = yield mascotasModel_1.default.findPetBySpecies(especie);
            try {
                if (found) {
                    return res.status(200).json(found);
                }
                return res.status(404).json({ message: 'No se encontraron mascotas de la especie solicitada!' });
            }
            catch (err) {
                return res.status(403).json({ message: 'Ha ocurrido un error inesperado :/' });
            }
        });
    }
    actualizarMascota(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            yield mascotasModel_1.default.update(req.body, id);
            return res.status(200).json({ message: "La información de la mascota se actualizó correctamente!" });
        });
    }
    eliminarMascota(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield mascotasModel_1.default.delete(id);
            return res.status(200).json({ message: 'El turno ha sido removido con éxito!' });
        });
    }
    // public showError(req: Request, res: Response){
    //     // res.send({ "Usuario y/o contraseña incorrectos": req.body });
    //     res.render("partials/error");
    // }
    //FIN CRUD
    // public notSignedUp(req:Request,res:Response){
    // 	console.log(req.body);
    // 	res.render("partials/notSignedUp");
    // }
    // public async updateV(req: Request, res: Response) {
    //         const { id } = req.params;
    //         const result = await userModel.buscarId(id);
    //         res.render('partials/update', { user: result });
    //     }
    // public async getPets (req:Request, res: Response){
    //     const { id } = req.params;
    //     // if()
    // }
    //**********************************************
    //        Control Historias clínicas           *
    //***********************************************
    crearHistoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const hc = req.body;
            const { id_animal } = req.body;
            console.log(id_animal);
            console.log(req.body);
            console.log(req.params);
            const match = yield historiaClinicaModel_1.default.findClinicFileByPetID(id_animal);
            if (match) {
                return res.status(403).json({ message: 'Ya existe una ficha con el numero de mascota ingresado' });
            }
            const match2 = yield mascotasModel_1.default.findPetByID(id_animal);
            if (match2) {
                try {
                    const hc = req.body;
                    const result = yield historiaClinicaModel_1.default.createClinicFile(hc);
                    console.log(hc);
                    return res.status(200).json({ message: 'Se ha registrado una nueva historia clinica: ', result });
                }
                catch (e) {
                    return res.status(403).json({ message: 'Ha ocurrido un error inesperado!', e });
                }
            }
            else {
                return res.status(404).json({ message: 'No es posible añadir una ficha clínica, no se ha registrado ningun animal con el numero de ficha ingresado' });
            }
            //DE PRUEBA MOMENTANEO, UNA VEZ SOLUCIONADO EL METODO DE ARRIBA, SE REEMPLAZA
            // try{ 
            //                 const hc = req.body;
            //                 const result = await historiaClinicaModel.createClinicFile(hc);
            //                 console.log(hc);
            //                 return res.status(200).json({message: 'Se ha registrado una nueva historia clinica: '});
            //             }catch(error){
            //                 return res.status(403).json({message: 'Ha ocurrido un error inesperado!', error})
            //             }
        });
    }
    //   public async listarFichas(req: Request, res: Response){
    //     const result = await historiaClinicaModel.listAllClinicFiles();
    //     try{ 
    //         if(result.length > 0){
    //             return res.json(result);
    //         }else{
    //             return res.status(404).json({message:'Listado vacío!'})
    //         }
    //     }catch(error){
    //         return res.status(403).json({message: 'Ha ocurrido un error inesperado :/'});
    //     }
    //   }
    listarFichas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield historiaClinicaModel_1.default.listAllClinicFiles();
            try {
                if (result.length > 0) {
                    return res.json(result);
                }
                else {
                    return res.status(404).json({ message: 'Listado vacío!' });
                }
            }
            catch (error) {
                return res.status(403).json({ message: 'Ha ocurrido un error inesperado :/' });
            }
        });
    }
    listarFichaPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield historiaClinicaModel_1.default.findClinicFileByID(id);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(400).json({ message: 'No se encontraron fichas con el numero ingresado' });
        });
    }
    modificarHistoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield historiaClinicaModel_1.default.updateClinicFile(req.body, id);
            if (result) {
                return res.status(200).json({ message: 'Historia actualizada' });
            }
            console.log(result);
        });
    }
    // public async control (req:Request,res:Response){
    //     //res.send('Controles');
    //     if(!req.session.auth){
    //        req.flash('error_session','Debes iniciar sesion para ver esta seccion');
    //        res.redirect("./error");
    //        // res.redirect("/");
    //    }
    //     const usuarios = await userModel.listar();
    //     const users = usuarios;
    //     res.render('partials/controls', { users: usuarios });
    //    }
    //    public async procesar (req:Request,res:Response){
    //        console.log(req.body);
    //        if(!req.session.auth){
    //            // res.redirect("/");
    //            req.flash('error_session','Debes iniciar sesion para ver esta seccion');
    //            res.redirect("./error");
    //        }
    //        console.log(req.body);
    //        let usuario=req.body.usuario;
    //        var usuarios:any=[];
    //        console.log(usuario);
    //        if(usuario.length>0){
    //            for(let elemento of usuario){
    //                const encontrado = await userModel.findByID(elemento);
    //                if (encontrado){
    //                    usuarios.push(encontrado);
    //                    console.log(encontrado);
    //                }
    //            }
    //        }
    //        console.log(usuarios);
    //        res.render("partials/seleccion",{usuarios,home:req.session.user,mi_session:true});
    //        // res.send('Recibido!!!');
    //    }
    //************************************
    //         Auth-Sessions              *
    //**************************************
    //Controller 
    traerData_(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            const { id } = req.params;
            console.log(id);
            const result = yield userModel_1.default.findUserByID_(id);
            res.status(200).json(result);
            return;
        });
    }
    //   public async traerData(req:Request, res: Response){
    //     const {id} = req.params
    //     const result = await userModel.findUserByID_(id)
    //     return res.status(200).json(result);
    //     }
    actualizarData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.body);
            const { nombre, apellido, telefono, dni, celular, domicilio, email, password, rol } = req.body;
            try {
                const result = yield userModel_1.default.updateUser(id, nombre, apellido, telefono, dni, celular, domicilio, email, password);
                return res.status(200).json({ mssagge: 'Sus datos han sido actualizados con éxito!' });
            }
            catch (e) {
                console.log(e);
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
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map