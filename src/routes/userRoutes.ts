import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';
import authController from '../controllers/authController';
import adminController from '../controllers/adminController';


class UserRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            res.send('USER ROUTES OK!!!');
            //res.render("partials/principal");
        });


		// this.router.get('/list',userController.listar);
		
		//  this.router.get('/usuario-nro/:id', adminController.buscarUsuarioPorID);
		 

		//Crud Perfil de usuario (TAREAS DE USUARIO)
		 this.router.get('/listado', adminController.listar);
		 this.router.get('/datos/:id', userController.traerData_);
		//  this.router.get('/data/:id', userController.traerData);
		 this.router.put('/perfil/:id', userController.actualizarData);



		 //Crud usuarios (TAREAS DEL ADMIN)
		this.router.get('/listado', adminController.listar);
		this.router.get('/profile/:id', adminController.buscarUsuarioPorID);
		this.router.get('/usuario/:dni', adminController.buscarUsuarioPorDNI);
		this.router.delete('/usuario-eliminar/:id', adminController.eliminarUsuario);


		// this.router.post('/add', authController.addUser);
		// this.router.put('/change-password/:id', userController.modificarPassword)
		// this.router.put('/update', userController.update);
	}
}

//Exportamos el enrutador con 

const userRoutes = new UserRoutes();
export default userRoutes.router;