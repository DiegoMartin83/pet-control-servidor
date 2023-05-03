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
        return connection;
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
                database: 'petcontroldb',
                connectionLimit: 10
            });
        });
    }
    turnByPetName(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            // SELECT  idVisita, fechaVisita, horaVisita, id_profesional  FROM turnos t JOIN  mascotas m ON t.id_mascota = m.idMascota WHERE nombre = "Lucky" AND idVisita IS NOT NULL
            // const turnPetName = (await  this.db.query('SELECT  idVisita, fechaVisita, horaVisita, id_profesional  FROM turnos t  JOIN  mascotas m ON t.id_mascota = m.idMascota WHERE turnos.id_mascota IS NOT NULL AND m.nombre = ?  ' , [nombre]));
            const turnPetName = (yield this.db.query('SELECT  *  FROM turnos WHERE nombre_mascota = ?  ', [nombre]));
            if (turnPetName)
                return turnPetName[0];
            return null;
        });
    }
    create(turno) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO turnos SET ?', [turno]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    changeStateActive(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turnos = yield this.db.query('UPDATE turnos t SET t.estado = 1 WHERE idVisita = ?;', [id]);
            return turnos[0];
        });
    }
    changeStateEnd(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turnos = yield this.db.query('UPDATE turnos t SET t.estado = 2 WHERE idVisita = ?;', [id]);
            return turnos[0];
        });
    }
    changeStateToCancel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turnos = yield this.db.query('UPDATE turnos t SET t.estado = 3 WHERE idVisita = ?;', [id]);
            return turnos[0];
        });
    }
    changeStatePosp(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turnos = yield this.db.query('UPDATE turnos SET estado = 4 WHERE idVisita = ?;', [id]);
            return turnos[0];
        });
    }
    // async listTurns() {
    // 	const turnos = await this.db.query('SELECT * FROM turnos');
    // 	return turnos[0];
    // }
    listTurns() {
        return __awaiter(this, void 0, void 0, function* () {
            const turnos = yield this.db.query('SELECT t.idVisita, t.fechaVisita, t.horaVisita, t.nombre_mascota,t.id_mascota, t.idProfesional, et.estado FROM turnos t INNER JOIN estado_turno et ON t.estado = et.idEstado_turno');
            return turnos[0];
        });
    }
    //TURNOS SEGUN FECHA Y HORA
    listTurnsByDate() {
        return __awaiter(this, void 0, void 0, function* () {
            const turnos = yield this.db.query('SELECT  idVisita, fechaVisita, horaVisita, nombre_mascota, id_mascota, idProfesional FROM turnos ORDER BY fechaVisita ASC;');
        });
    }
    // METODO FINAL, UNA VEZ SE RESUELVE EL PROBLEMA DEL INGRESO DE FECHA DESDE EL CODIGO
    // async listTurns() {//Devuelve todas las filas de la tabla usuario
    // 	//const db=this.connection;
    // 	const usuarios = await this.db.query('SELECT * FROM turnos ORDER BY fechaVisita ASC GROUP BY  horaVisita ASC');
    // 	//console.log(usuarios[0]);
    // 	//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
    // 	return usuarios[0];
    // }
    getTurnByPetID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turn = yield this.db.query('SELECT * FROM turnos WHERE id_mascota=?', [id]);
            if (turn) {
                return turn[0][0];
            }
            return null;
        });
    }
    updateTurns(turno, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE turnos SET ? WHERE idVisita = ?', [turno, id]))[0].affectedRows;
            return result;
        });
    }
    getTurnById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM turnos WHERE idVisita = ?', [id]);
            if (found.length > 1)
                return found[0][0];
            return null;
        });
    }
    getTurnByProfID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM turnos WHERE id_profesional = ?', [id]);
            if (found)
                return found[0][0];
            return null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turno = (yield this.db.query('DELETE FROM turnos WHERE idVisita = ?', [id]))[0].affectedRows;
            console.log(turno);
            return turno;
        });
    }
    deleteAllTurns() {
        return __awaiter(this, void 0, void 0, function* () {
            const turnos = (yield this.db.query('TRUNCATE TABLE turnos'));
        });
    }
    state(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT into estado_turnos SET ?', [state]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
}
const turnosModel = new TurnosModel();
exports.default = turnosModel;
//# sourceMappingURL=turnosModel.js.map