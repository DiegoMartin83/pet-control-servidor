import { Router, Request, Response } from 'express';
class EstudiosRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            res.send('Estudios routes OK!!!');
            //res.render("partials/principal");
        });
	}
}

//Exportamos el enrutador con 

const estudiosRoutes = new EstudiosRoutes();
export default estudiosRoutes.router;