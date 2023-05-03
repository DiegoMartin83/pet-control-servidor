import { Router, Request, Response } from 'express';
import userController  from '../controllers/userController'
class MascotasRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            res.send('Mascotas routes ok!!!');
            //res.render("partials/principal");
        });

	   //this.router.get('/listado', userController.listarMascotas);
		this.router.post('/alta', userController.altaMascota);
		this.router.get('/listado', userController.listarMascotas);
		this.router.get('/especie/:especie', userController.buscarMascotaPorEspecie);
		this.router.get('/afiliado-mascota', userController.traerMascotaPorIdAfiliado);
		this.router.get('/mascota-afiliado/:id', userController.buscarMascotaPorIdAfiliado);
		this.router.get('/animal-nro/:id', userController.buscarMascotaPorId);
		this.router.put('/actualizar/:id', userController.actualizarMascota);
		this.router.delete('/delete/:id', userController.eliminarMascota);
		
		
	}
}

//Exports del Router 

const mascotasRoutes = new MascotasRoutes();
export default mascotasRoutes.router;