"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const path_1 = __importDefault(require("path"));
// import adminRoutes from "./routes/adminRoutes";
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const afiliadosRoutes_1 = __importDefault(require("./routes/afiliadosRoutes"));
const mascotasRoutes_1 = __importDefault(require("./routes/mascotasRoutes"));
const estudiosRoutes_1 = __importDefault(require("./routes/estudiosRoutes"));
const turnosRoutes_1 = __importDefault(require("./routes/turnosRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const contactUsRoutes_1 = __importDefault(require("./routes/contactUsRoutes"));
const historiaClinicaRoutes_1 = __importDefault(require("./routes/historiaClinicaRoutes"));
const express_session_1 = __importDefault(require("express-session"));
const colors = require('Colors');
console.log('Servidor Pet Control ONLINE!!!');
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        //Configuraciones
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('views', path_1.default.join(__dirname, 'views')); //indicamos que views esta en dist y no en el modulo principal
        this.app.engine('.hbs', express_handlebars_1.default({
            defaultLayout: 'main',
            layoutsDir: path_1.default.join(this.app.get('views'), 'layouts'),
            partialsDir: path_1.default.join(this.app.get('views'), 'partials'),
            extname: 'hbs',
            helpers: require('./lib/handlebars') //definimos donde estan los helpers
        }));
        this.app.set('view engine', '.hbs'); //ejecutamos el modulo definido
        //Middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default({
            origin: ["http://localhost:4200"],
            credentials: true
        })); //iniciamos cors
        this.app.use(express_1.default.json()); //habilitamos el intercambio de objetos json entre aplicaciones
        this.app.use(express_1.default.urlencoded({ extended: true })); //habilitamos para recibir datos a traves de formularios html.
        this.app.use(express_session_1.default({
            secret: 'secret_supersecret',
            resave: false,
            saveUninitialized: false //indica que no se guarde la sesion hasta que se inicialice
        }));
        //Variables globales
        this.app.use((req, res, next) => {
            //aca se agregan variables locales con this.app.locals.
            next();
        });
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use("/auth", authRoutes_1.default);
        // this.app.use("/admin", adminRoutes);
        this.app.use("/user", userRoutes_1.default);
        this.app.use("/afiliados", afiliadosRoutes_1.default);
        this.app.use("/mascotas", mascotasRoutes_1.default);
        this.app.use("/turnos", turnosRoutes_1.default);
        this.app.use("/estudios", estudiosRoutes_1.default);
        this.app.use("/contacto", contactUsRoutes_1.default);
        this.app.use("/fichas", historiaClinicaRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server runing on Port: " + this.app.get('port'));
        });
    }
}
const server = new Server();
server.start(); //Ejecutamos el metodo start en inicia el server
//# sourceMappingURL=index.js.map