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
exports.connect = void 0;
const promise_1 = require("mysql2/promise");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.createPool({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'sanlorenzo',
            database: 'petcontrol',
            connectionLimit: 10
        });
        return connection; //devolvemos el manejador de conexion
    });
}
exports.connect = connect;
// import { createPool } from 'mysql2/promise';
class AfiliadosModel {
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
    //************************************
    //         Control Afiliados          *
    //*************************************
    create(afiliado) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO afiliados SET ?', [afiliado]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    listarAfiliados() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const usuarios = yield this.db.query('SELECT * FROM afiliados');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return usuarios[0];
        });
    }
    buscarAfiliadosById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM afiliados WHERE id = ?', [id]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    findAfiByDocument(dni) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM afiliados WHERE dni = ?', [dni]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (found.length > 1)
                return found[0];
            return null;
        });
    }
    findAfiBySurname(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM afiliados WHERE apellido = ?', [nombre]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    getAfiByMail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM afiliados a  JOIN mascotas  m on a.idAfiliado = m.id_afiliado WHERE email = ?', [mail]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (found.length > 1)
                return found[0][0];
            return null;
        });
    }
    //Devuelve 1 si logro actualizar el afiliado indicado por id
    updateAfiliado(afiliado, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE afiliados SET ? WHERE idAfiliado = ?', [afiliado, id]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //Devuelve 1 si logro eliminar el afiliado indicado por id
    eliminar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const afiliado = (yield this.db.query('DELETE FROM afiliados WHERE idAfiliado = ?', [id]))[0].affectedRows;
            console.log(afiliado);
            return afiliado;
        });
    }
}
const afiliadosModel = new AfiliadosModel();
exports.default = afiliadosModel;
//# sourceMappingURL=afiliadosModel.js.map