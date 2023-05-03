import { Request, Response } from 'express';
import turnosModel from '../models/turnosModel';


import flash from "connect-flash";
import jwt from "jsonwebtoken";

class TurnosController {


      

    // public async listadoturnos(req: Request, res: Response) {
    //       console.log(req.body);
    //     //  console.log(req.header("Authorization")); *///Observamos el valor del token
    //     const turnos = await turnosModel.listarTurnos();
    //     console.log(turnos);
    //     return res.json(turnos)
    //     return res.status(200).json(turnos);
    // }


    // public async nuevoTurno(req:Request, res: Response){
    //     const turno=req.body;
    //     const result= await turnosModel.create(turno);
    //      console.log(turno);
    //     res.render("partials/testTurno");
    //     return res.json({ message: 'Turno agendado con éxito: ' });
       

    // }

    // public async find(req: Request, res: Response) {
    //     console.log(req.params.id);
    //     const { id } = req.params;
    //     const usuario = await userModel.buscarId(id);
    //     if (usuario)
    //         return res.json(usuario);
    //     res.status(404).json({ text: "Usuario no registrado" });
    // }




    // public async update(req: Request, res: Response) {
    //     console.log(req.body);
    //     const { id } = req.params;
    //     const result = await userModel.actualizar(req.body, id);
    //     return res.json({ text: 'updating a user ' + id });
    // }

    // public async delete(req: Request, res: Response) {
    //     console.log(req.body);
    //     const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
    //     const result = await userModel.eliminar(id);
        
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
    //             const encontrado = await userModel.buscarId(elemento);
    //             if (encontrado) {
    //                 usuarios.push(encontrado);
    //             }
    //         }
    //     }

    //     console.log(usuarios);
    //     res.render("partials/seleccion", { usuarios, home: req.session.user, mi_session: true });
    // }

    // public endSession(req: Request, res: Response) {
    //     console.log(req.body);
    //     req.session.user = {};
    //     req.session.auth = false;
    //     req.session.destroy(() => console.log("Session finalizada"));
    //     res.redirect("/");
    // }
}

const turnosController = new TurnosController();
export default turnosController;