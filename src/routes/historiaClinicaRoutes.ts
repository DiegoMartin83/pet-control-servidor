import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';



class HistoriaClinicaRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
           
            res.send('HISTORIAS CLINICAS ROUTES OK!!!');
            //res.render("partials/principal");
        });



        
         this.router.post('/alta', userController.crearHistoria);
		 this.router.get('/listado', userController.listarFichas);
		 this.router.get('/ficha-nro/:id', userController.listarFichaPorId);
		 this.router.put('/actualizar/:id', userController.modificarHistoria);
		// this.router.get('/consultas', contactUsController.listContacts);
		// this.router.delete('/eliminado/:id', contactUsController.eliminarConsulta);
        
	}

    
}

//Exportamos el enrutador con 

const historiaClinicaRoutes = new HistoriaClinicaRoutes();
export default historiaClinicaRoutes.router; 