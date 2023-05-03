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
            host: 'us-cdbr-east-03.cleardb.com',
            port: 3306,
            user: 'b7146e3523096a',
            password: 'e6432e3b',
            database: 'heroku_110e4ea57743945',
            connectionLimit: 10
        });
        return connection; //devolvemos el manejador de conexion
    });
}
exports.connect = connect;
class TurnosModel {
    constructor() {
        this.config(); //aplicamos la conexion con la BD.
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield promise_1.createPool({
                host: 'localhost',
                user: 'root',
                password: 'sanlorenzo',
                database: 'petcontrol',
                connectionLimit: 10
            });
        });
    }
    listarTurnos() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const usuarios = yield this.db.query('SELECT * FROM turnos');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return usuarios[0];
        });
    }
    //Devuelve un objeto cuya fila en la tabla usuarios coincide con id.
    //Si no la encuentra devuelve null
    buscarTurnosPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM turnos WHERE id = ?', [id]);
            if (found.length > 1)
                return found[0][0];
            return null;
        });
    }
    //Devuelve 1 si logro crear un nuevo turno de la tabla turnos
    create(turno) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO turnos SET ?', [turno]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //Devuelve 1 si logro actualizar el turno indicado por id
    modificarTurno(turno, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE turnos SET ? WHERE ID = ?', [turno, id]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //Devuelve 1 si logro eliminar el usuario indicado por id
    eliminar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turno = (yield this.db.query('DELETE FROM turnos WHERE ID = ?', [id]))[0].affectedRows;
            console.log(turno);
            return turno;
        });
    }
}
const turnosModel = new TurnosModel();
exports.default = turnosModel;
//# sourceMappingURL=turnosModels.js.map