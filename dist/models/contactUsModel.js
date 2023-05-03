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
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
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
class ContactUsModel {
    constructor() {
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
    crearConsulta(contacto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO contacto SET ?', [contacto]))[0].affectedRows;
            return result;
        });
    }
    listarConsultas() {
        return __awaiter(this, void 0, void 0, function* () {
            const consultas = (yield this.db.query('SELECT * FROM contacto'));
            return consultas[0];
        });
    }
    deleteQuery(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = (yield this.db.query('DELETE FROM contacto WHERE idcontacto = ?', [id]))[0].affectedRows;
            console.log(query);
            return query;
        });
    }
}
const contactUsModel = new ContactUsModel();
exports.default = contactUsModel;
//# sourceMappingURL=contactUsModel.js.map