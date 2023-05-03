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
// import { createPool } from 'mysql2/promise';
class EstudiosModel {
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
    listarEstudios() {
        return __awaiter(this, void 0, void 0, function* () {
            const estudios = yield this.db.query('SELECT * FROM estudios');
            return estudios[0];
        });
    }
    buscarEstudioIdEstudio(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundS = yield this.db.query('SELECT * FROM estudios WHERE idEstudio = ?', [id]);
            if (foundS.length > 1)
                return foundS[0][0];
            return null;
        });
    }
    buscarEstudioPorIdAnimal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM estudios WHERE id_animal = ?', [id]);
            if (found.length > 1)
                return found[0][0];
            return null;
        });
    }
    buscarNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundNameS = yield this.db.query('SELECT nombreEstudio FROM estudios');
            if (foundNameS.length > 1)
                return foundNameS[0][0];
            return null;
        });
    }
    crear(estudio) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO estudios SET ?', [estudio]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    actualizar(estudio, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE estudios SET ? WHERE IdEstudio = ?', [estudio, id]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    eliminar(idEstudio) {
        return __awaiter(this, void 0, void 0, function* () {
            const estudio = (yield this.db.query('DELETE FROM estudios WHERE IdEstudio = ?', [idEstudio]))[0].affectedRows;
            return estudio;
        });
    }
    consultaEstudioMascota(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
}
const estudiosModel = new EstudiosModel();
exports.default = estudiosModel;
//# sourceMappingURL=estudiosModels.js.map