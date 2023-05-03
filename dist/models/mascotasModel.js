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
class MascotasModel {
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
    //***********************************************
    //                 Control  Mascotas            *
    //***********************************************
    // async listPets() {
    // 	const pets= await this.db.query('SELECT  *, TIMESTAMPDIFF(YEAR,fecha_nacimiento,CURDATE()) AS Edad   FROM mascotas;');
    // // 	SELECT  *, TIMESTAMPDIFF(YEAR,fecha_nacimiento,CURDATE()) AS Edad
    // //  FROM mascotas;
    // 	//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
    // 	if (pets.length > 1)
    // 		return pets[0];
    // }
    // async listPets() {
    // 	const pets= await this.db.query('SELECT  *, TIMESTAMPDIFF(YEAR,fecha_nacimiento,CURDATE()) AS Edad   FROM mascotas;');
    // // 	SELECT  *, TIMESTAMPDIFF(YEAR,fecha_nacimiento,CURDATE()) AS Edad
    // //  FROM mascotas;
    // 	//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
    // 	if (pets.length > 1)
    // 		return pets[0];
    // }
    listPets() {
        return __awaiter(this, void 0, void 0, function* () {
            // const pets= await this.db.query('SELECT  idAnimal, nombre, especie, raza, color, sexo, telefonoDuenio  FROM mascota;');
            const pets = yield this.db.query('SELECT  *,TIMESTAMPDIFF(YEAR,fechaDeNacimiento,CURDATE()) AS edad FROM mascota');
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (pets.length > 1)
                return pets[0];
        });
    }
    findPetByIDAfi(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pet = yield this.db.query('SELECT * FROM mascotas  WHERE id_afiliado = ?', [id]);
            if (pet.length > 1) {
                return pet[0][0];
            }
            return null;
        });
    }
    findPetByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM mascota WHERE idAnimal = ?', [id]);
            if (found.length > 1)
                return found[0][0];
            return null;
        });
    }
    matchPetFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM mascotas m INNER JOIN historia_clinica h ON m.idMascota = h.id_animal WHERE m.idMascota=?', [id]);
            if (found.length > 1)
                return found[0][0];
            return null;
        });
    }
    getPetAge(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const petAge = yield this.db.query('SELECT TIMESTAMPDIFF(YEAR,fecha_nacimiento,CURDATE()) AS Edad FROM from mascotas WHERE idMascota = ?', [id]);
            if (petAge.length > 1)
                return petAge[0];
        });
    }
    findPetByName(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM mascota WHERE nombre = ?', [nombre]);
            if (found.length > 1)
                return found[0][0];
            return null;
        });
    }
    findPetBySpecies(especie) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM mascotas WHERE especie = ?', [especie]);
            if (found.length > 1)
                return found[0];
            return null;
        });
    }
    findPetByDNIonr(dni) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM mascota WHERE dniDuenio = ?', [dni]);
            if (found.length > 1)
                return found[0];
            return null;
        });
    }
    //Consulta
    //listar tabla
    //Consulta a Juan 
    findMatchPetAfiliado() {
        return __awaiter(this, void 0, void 0, function* () {
            const foundPet = yield this.db.query('SELECT * FROM mascotas  m  INNER JOIN  afiliados  a ON m.id_afiliado = a.idAfiliado');
            return foundPet[0];
        });
    }
    create(newPet) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO mascota SET ?', [newPet]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    update(pet, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE mascota SET ? WHERE idAnimal = ?', [pet, id]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pet = (yield this.db.query('DELETE FROM mascota WHERE idAnimal = ?', [id]))[0].affectedRows;
            console.log(pet);
            return pet;
        });
    }
}
const mascotasModel = new MascotasModel();
exports.default = mascotasModel;
//# sourceMappingURL=mascotasModel.js.map