import { Router, Request, Response } from 'express';
import contactUsController from '../controllers/contactUsController';



class ContactUsRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
           
            res.send('CONTACT ROUTES OK!!!');
            //res.render("partials/principal");
        });



        
        this.router.post('/consulta', contactUsController.createContact);
		this.router.get('/consultas', contactUsController.listContacts);
		this.router.delete('/eliminado/:id', contactUsController.eliminarConsulta);
        
	}

    
}

//Exportamos el enrutador con 

const contactUsRoutes = new ContactUsRoutes();
export default contactUsRoutes.router; 