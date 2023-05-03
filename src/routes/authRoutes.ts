
import { Router, Request, Response } from 'express';
import authController from '../controllers/authController';
import { validationToken } from '../lib/verifyToken';


class AuthRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            req.session.auth = false;
            req.session.user = {};
            res.send('Auth ROUTES OK!!!');
            //res.render("partials/principal");
        });

        this.router.post('/signin', authController.login);
        this.router.post('/signup', authController.addUser);
        this.router.put('/forgot', authController.restorePwd);
	}

    
}

//Exportamos el enrutador con 

const authRoutes = new AuthRoutes();
export default authRoutes.router; 