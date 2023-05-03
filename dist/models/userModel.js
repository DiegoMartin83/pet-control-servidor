"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// export async function connect(){
// 	const connection = await createPool({
// 		host: 'us-cdbr-east-03.cleardb.com',
// 		port:3306,
// 		user: 'b7146e3523096a',
//      	password:'e6432e3b',
// 		database: 'heroku_110e4ea57743945',
// 		connectionLimit: 10
// 	});
// 	return connection; //devolvemos el manejador de conexion
// }
// import { createPool } from 'mysql2/promise';
class UserModel {
    constructor() {
        this.encriptPass = (password) => __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            return yield bcryptjs_1.default.hash(password, salt);
        });
        this.validarPassword = function (password, passwordHash) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield bcryptjs_1.default.compare(password, passwordHash);
            });
        };
        this.config(); //aplicamos la conexion con la BD.
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield promise_1.createPool({
                host: 'localhost',
                user: 'root',
                password: 'sanlorenzo',
                database: 'petcontroldb',
                connectionLimit: 10
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const usuarios = yield this.db.query('SELECT id, nombre, apellido, dni, telefono, celular, domicilio, email, rol, perfil FROM usuarios');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return usuarios[0];
        });
    }
    //Devuelve un objeto cuya fila en la tabla usuarios coincide con id.
    //Si no la encuentra devuelve null
    findUserByDNI(dni) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT id, nombre, apellido, dni, telefono, celular, domicilio, email, rol, perfil, fecha_nacimiento FROM usuarios WHERE dni = ?', [dni]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    findUserByID_(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = (yield this.db.query('SELECT *  FROM usuarios WHERE id = ?', [id]));
            return found[0][0];
        });
    }
    // async findUserByID_(id:string){
    // 	const found: any = await this.db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    // 	// if(found.length > 0){
    // 		return found[0][0];
    // 	//}
    // }
    // async findUserByID(id:string){
    // 	const found: any = await this.db.query('SELECT id, nombre, apellido, dni, telefono, celular, domicilio, email, rol, perfil, fecha_nacimiento FROM usuarios WHERE id = ?', [id]);
    // 	if(found.length > 0){
    // 		return found[0][0];
    // 	}
    // 	return null;
    // }
    findUserByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            if (found.length > 0) {
                return found[0][0];
            }
            return null;
        });
    }
    //Devuelve un objeto cuya fila en la tabla usuarios coincide con nombre.
    //Si no la encuentra devuelve null
    findUserByName(apellido) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM usuarios WHERE apellido = ?', [apellido]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    findUserByMail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM usuarios WHERE email = ?', [mail]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (found.length > 1)
                return found[0][0];
            return null;
        });
    }
    findMail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM usuarios WHERE email = ?', [mail]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (found.length > 1)
                return found[0][0];
            return null;
        });
    }
    deleteUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield this.db.query('DELETE FROM usuarios WHERE ID = ?', [id]))[0].affectedRows;
            console.log(user);
            return user;
        });
    }
    //Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
    create(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO usuarios SET ?', [usuario]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //Devuelve 1 si logro actualizar el usuario indicado por id
    // async updateUser(usuario: object, id: string) {
    // 	const result = (await this.db.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, id]))[0].affectedRows;
    // 	console.log(result);
    // 	return result;
    // }
    //Model
    updatePass(usuario, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE usuarios SET password = ? WHERE id = ? ', [usuario, id]))[0].affectedRows;
            return result;
        });
    }
    updateUser(id, nombre, apellido, telefono, dni, celular, domicilio, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE usuarios SET  nombre = ? , apellido = ? , dni = ?, telefono = ? , celular = ? , domicilio = ? , email = ? ,password = ?   WHERE id = ?', [nombre, apellido, dni, telefono, celular, domicilio, email, password, id]))[0].affectedRows;
            return result;
        });
    }
    // async updateUser( id:string,nombre:string, apellido:string, telefono:string,dni:string, celular:string, domicilio:string, email:string, password:string){
    // 	const result = (await this.db.query('UPDATE usuarios SET  nombre = ? , apellido = ? , dni = ?, telefono = ? , celular = ? , domicilio = ? , email = ? ,password = ?   WHERE id = ?', [id,nombre, apellido,dni,  telefono, celular,domicilio, email, password]))[0].affectedRows;
    // 	return result;
    // }
    // async updateUser( user:object, id:string){
    // 	const result = (await this.db.query('UPDATE usuarios SET  ?   WHERE id = ?', [id,user]))[0].affectedRows;
    // 	return result;
    // }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield this.db.query('DELETE  FROM usuarios WHERE id = ?', [id]))[0].affectedRows;
            console.log(user);
            return user;
        });
    }
}
//Exportamos el enrutador con 
const userModel = new UserModel();
exports.default = userModel;
//# sourceMappingURL=userModel.js.map