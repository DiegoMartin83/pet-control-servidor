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
            database: 'petcontroldb',
            connectionLimit: 10
        });
        return connection; //devolvemos el manejador de conexion
    });
}
exports.connect = connect;
// import { createPool } from 'mysql2/promise';
class HistoriaClinicaModel {
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
    //**********************************************
    //         Control Historias Clínicas           *
    //***********************************************
    //Users tasks
    createClinicFile(hc) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO historia_clinica SET ?', [hc]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    listAllClinicFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const clinicalFile = yield this.db.query('SELECT hc.idHistoriaClinica ,m.nombre, m.especie, m.raza, hc.descripcion, hc.resumen FROM historiaclinica hc INNER JOIN mascota m ON hc.id_Animal = m.idAnimal');
            return clinicalFile[0];
        });
    }
    listTurns() {
        return __awaiter(this, void 0, void 0, function* () {
            const turnos = yield this.db.query('SELECT t.idVisita, t.fechaVisita, t.horaVisita, t.nombre_mascota,t.id_mascota, t.idProfesional, et.estado FROM turnos t INNER JOIN estado_turno et ON t.estado = et.idEstado_turno');
            return turnos[0];
        });
    }
    // async listAllClinicFiles() {
    // 	const clinicalFile = await this.db.query('SELECT * FROM historia_clinica');
    //     return clinicalFile[0];
    // }
    findClinicFileByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = (yield this.db.query('SELECT * from historiaclinica WHERE idHistoriaClinica = ?', [id]));
            if (found.length > 1)
                return found[0][0];
            return null;
        });
    }
    //RESOLVER ESTA CONSULTA, NECESITO MATCH ENTRE EL NUMERO DE ID DE MASCOTA INGRESADO AL MOMENTO DE CREAR HISTORIA CLINICA COSA QUE, CUANDO
    //INTENTE HACER EL MATCH TRAYENDO HISTORIAS CLINICAS PARA COMPARAR CON EL ID DE ANIMAL A VER SI YA HAY UNA HISTORIA CLINICA EXISTENTE CON ESE ID DE ANIMAL ME LO TOME
    //QUEDA MOMENTANEAMENTE CANCELADO EL METODO DE USER-CONTROLLER/CONTROL HISTORIAS CLINICAS "match2"
    findClinicFileByPetID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * from historia_clinica where id_animal =? ', [id]);
            if (found.length > 1)
                return found[0][0];
            return null;
        });
    }
    // async matchPetFile(id:string){
    // 	const match: any = await this.db.query('SELECT * FROM mascotas m INNER JOIN ')
    // }
    // async findClinicFileByPetName(name:string){
    // 	const found = ( await this.db.query('SELECT * from historia_clinica WHERE ID = ?', [name]));
    // 	if (found.length > 1)
    // 		return found[0][0];
    // 	return null;
    // }
    updateClinicFile(hc, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE historiaclinica SET  ?  WHERE idHistoriaClinica = ?', [hc, id]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //Devuelve 1 si logro eliminar el registro de la mascota indicado por id
    deleteClinicFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = (yield this.db.query('DELETE FROM historia_clinica WHERE ID = ?', [id]))[0].affectedRows;
            console.log(file);
            return file;
        });
    }
}
const historiaClinicaModel = new HistoriaClinicaModel();
exports.default = historiaClinicaModel;
//# sourceMappingURL=historiaClinicaModel.js.map