import { Router, Request, Response } from 'express';
import turnosController from '../controllers/turnosController';
import userController from '../controllers/userController';
import {validationToken} from "../lib/verifyToken";
import {CheckRol} from "../lib/verifyRol";

// import {verifyToken} from '.' 
class TurnosRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            res.send('Turnos routes ok!!!');
            //res.render("partials/principal");
        });
		
		

		//this.router.get('/listado', [tokenValidation, checkRol='Admin'], turnosController.listadoturnos);
		// this.router.get('/listado', validationToken , turnosController.listadoturnos);
		// this.router.post('/nuevo', validationToken , turnosController.nuevoTurno);
		// this.router.put('/modificar/:id',validationToken ,  userController.updateTurn);
		this.router.post('/nuevo',  userController.asignarTurno);
		this.router.get('/veterinario/:id', userController.buscarTurnoPorProfesional);
		this.router.get('/turno-mascota/:id', userController.buscarTurnoPorIdMascota);
		this.router.get('/listado', userController.listadoTurnos);
		// this.router.get('/listado',[validationToken], userController.listadoTurnos);
		this.router.get('/visita-nro/:id', userController.buscarTurnosPorId);
		this.router.get('/turno-nombre/:nombre', userController.buscarTurnoPorNombre);
		this.router.put('/modificar/:id',  userController.modificarTurno);
		this.router.put('/modificar/:id',  userController.modificarTurno);
		this.router.delete('/eliminar-turno/:id', userController.eliminarTurno);  
		this.router.delete('/eliminar-turnos', userController.eliminarTurnos);
		
	}
}

//Exportamos el enrutador con 

const turnosRoutes = new TurnosRoutes();
export default turnosRoutes.router;