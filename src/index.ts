import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import exphbs from "express-handlebars";
import path from "path";
// import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import afiliadosRoutes from "./routes/afiliadosRoutes";
import mascotasRoutes from "./routes/mascotasRoutes";
import estudiosRoutes from "./routes/estudiosRoutes"
import turnosRoutes from './routes/turnosRoutes';
 import authRoutes from './routes/authRoutes';
 import contactUsRoutes from './routes/contactUsRoutes';
 import historiaClinicaRoutes from './routes/historiaClinicaRoutes';
import session from 'express-session';

const colors = require('Colors');





console.log('Servidor Pet Control ONLINE!!!');

declare module 'express-session' { //Se redefine para declarar 2 variables (user y auth)
	export interface SessionData {
	  auth: boolean //indicara si el usuario ha iniciado sesion o no.
	  admin:boolean;
	  user: { [key: string]: any} | any;//en user guardaremos datos de interes
	  administrativo: boolean;
	  veterinario: boolean;
	 
	}
  }

class Server {
	public app: Application;
	constructor() {
		this.app = express();

		this.config();
		this.routes();
	}
	config(): void {
		//Configuraciones
		this.app.set('port', process.env.PORT || 3000);


		this.app.set('views', path.join(__dirname, 'views')); //indicamos que views esta en dist y no en el modulo principal
		this.app.engine('.hbs', exphbs({ //nombre del motor, configuracion
			defaultLayout: 'main',
			layoutsDir: path.join(this.app.get('views'), 'layouts'),
			partialsDir: path.join(this.app.get('views'), 'partials'),
			extname: 'hbs', //definimos la extension de los archivos
			helpers: require('./lib/handlebars') //definimos donde estan los helpers
		}));
		this.app.set('view engine', '.hbs'); //ejecutamos el modulo definido

		//Middlewares
		this.app.use(morgan('dev'));
		this.app.use(cors({
			origin: ["http://localhost:4200"],
			credentials: true
		})); //iniciamos cors
		this.app.use(express.json()); //habilitamos el intercambio de objetos json entre aplicaciones
		this.app.use(express.urlencoded({ extended: true }));//habilitamos para recibir datos a traves de formularios html.
		this.app.use(session({
			secret: 'secret_supersecret',//sirve para crear el hash del SSID unico
			resave: false,//evita el guardado de sesion sin modificaciones
			saveUninitialized: false //indica que no se guarde la sesion hasta que se inicialice
		}));
		

		//Variables globales
		this.app.use((req, res, next) => {
		
			//aca se agregan variables locales con this.app.locals.
			next();
		});
	}
	routes():void{
        this.app.use(indexRoutes);
		this.app.use("/auth", authRoutes);
		// this.app.use("/admin", adminRoutes);
		this.app.use("/user",userRoutes); 
		this.app.use("/afiliados",afiliadosRoutes); 
		this.app.use("/mascotas",mascotasRoutes); 
		this.app.use("/turnos",turnosRoutes); 
		this.app.use("/estudios",estudiosRoutes); 
		this.app.use("/contacto", contactUsRoutes);
		this.app.use("/fichas", historiaClinicaRoutes);
	
		
    }
	start(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log("Server runing on Port: " + this.app.get('port'));
		}
		);
	}
}

const server = new Server();
server.start(); //Ejecutamos el metodo start en inicia el server