import { Router, Request, Response } from 'express';
import {CheckRol} from "../lib/verifyRol";
import {validationToken} from "../lib/verifyToken";
import adminController from '../controllers/adminController'
class AfiliadosRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            res.send('Clientes routes OK!!!');
            //res.render("partials/principal");
        });



		//Crud afiliados (TAREAS DEL ADMIN)

		this.router.get('/nro/:id', adminController.buscarUsuarioPorID);
		this.router.get('/listado', adminController.listadoAfiliados);
		this.router.get('/buscar/:apellido', adminController.buscarAfiliadoPorApellido);
		this.router.get('/buscar-documento/:dni', adminController.buscarAfiliadoPorDNI);
		this.router.post('/alta', validationToken, adminController.altaAfiliado);
		 this.router.delete('/remover/:id', validationToken, adminController.eliminarAfiliado);
		// this.router.delete('/remover/:id',  adminController.eliminarAfiliado);
		this.router.get('/correo/:email', adminController.buscarAfiliadoPorMail);
		this.router.put('/modificar/:id', adminController.modificarAfiliado);

		
		
		
		
		
	}
}

//Exportamos el enrutador con 

const  afiliadosRoutes = new  AfiliadosRoutes();
export default  afiliadosRoutes.router;