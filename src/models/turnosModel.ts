import {createPool} from 'mysql2/promise';
import  bcryptjs from 'bcryptjs';


export async function connect(){
	const connection = await createPool({
		host: 'us-cdbr-east-03.cleardb.com',
		port:3306,
		user: 'b7146e3523096a',
     	password:'e6432e3b',
		database: 'heroku_110e4ea57743945',
		connectionLimit: 10
	});
	return connection; 
}



class TurnosModel {
	private db: any;
	constructor() {
		this.config(); //aplicamos la conexion con la BD.
	}

	async config() {//Parametro de conexion con la BD.
		this.db = await createPool({
			host: 'localhost',
			user: 'root',
			password: 'sanlorenzo',
			database: 'petcontroldb',
			connectionLimit: 10
		});
		
	}
	
	async turnByPetName(nombre:string){


		// SELECT  idVisita, fechaVisita, horaVisita, id_profesional  FROM turnos t JOIN  mascotas m ON t.id_mascota = m.idMascota WHERE nombre = "Lucky" AND idVisita IS NOT NULL
		// const turnPetName = (await  this.db.query('SELECT  idVisita, fechaVisita, horaVisita, id_profesional  FROM turnos t  JOIN  mascotas m ON t.id_mascota = m.idMascota WHERE turnos.id_mascota IS NOT NULL AND m.nombre = ?  ' , [nombre]));
		const turnPetName = (await  this.db.query('SELECT  *  FROM turnos WHERE nombre_mascota = ?  ' , [nombre]));
		
		if (turnPetName)
			return turnPetName[0];
		
		return null;
		
	}
	async create(turno: object) {
		const result = (await this.db.query('INSERT INTO turnos SET ?', [turno]))[0].affectedRows;
		console.log(result);
		return result;
	}
	

	
	async changeStateActive( id:string){
		const turnos = await this.db.query('UPDATE turnos t SET t.estado = 1 WHERE idVisita = ?;', [id])
		return turnos[0];
	}
	async changeStateEnd( id:string){
		const turnos = await this.db.query('UPDATE turnos t SET t.estado = 2 WHERE idVisita = ?;', [id])
		return turnos[0];
	}
	async changeStateToCancel(id:string){
		const turnos = await this.db.query('UPDATE turnos t SET t.estado = 3 WHERE idVisita = ?;', [id])
		return turnos[0];
	}

	async changeStatePosp(id:string){
		const turnos = await this.db.query('UPDATE turnos SET estado = 4 WHERE idVisita = ?;',[id]);
		return turnos[0];
	}
	// async listTurns() {
	// 	const turnos = await this.db.query('SELECT * FROM turnos');
	// 	return turnos[0];
	// }


	async listTurns() {
		const turnos = await this.db.query('SELECT t.idVisita, t.fechaVisita, t.horaVisita, t.nombre_mascota,t.id_mascota, t.idProfesional, et.estado FROM turnos t INNER JOIN estado_turno et ON t.estado = et.idEstado_turno');
		return turnos[0];
	} 

	
	//TURNOS SEGUN FECHA Y HORA
	async listTurnsByDate (){

		const turnos = await this.db.query('SELECT  idVisita, fechaVisita, horaVisita, nombre_mascota, id_mascota, idProfesional FROM turnos ORDER BY fechaVisita ASC;');
	}


	// METODO FINAL, UNA VEZ SE RESUELVE EL PROBLEMA DEL INGRESO DE FECHA DESDE EL CODIGO
	// async listTurns() {//Devuelve todas las filas de la tabla usuario
	// 	//const db=this.connection;
	// 	const usuarios = await this.db.query('SELECT * FROM turnos ORDER BY fechaVisita ASC GROUP BY  horaVisita ASC');
	// 	//console.log(usuarios[0]);
	// 	//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
	// 	return usuarios[0];
	// }


	
	async getTurnByPetID(id:string){
		const turn = await this.db.query('SELECT * FROM turnos WHERE id_mascota=?', [id]);
		
		if (turn){
			return turn[0][0];
	
		}
		
		return null;
	}
	async updateTurns(turno:object, id:string){
		
		const result = (await this.db.query('UPDATE turnos SET ? WHERE idVisita = ?', [turno, id]))[0].affectedRows;
		return result;

	}


	async getTurnById(id: string) {
		const found: any = await this.db.query('SELECT * FROM turnos WHERE idVisita = ?', [id]);
		
		if (found.length > 1)
			return found[0][0];
		return null;
	}
	
	async getTurnByProfID (id:string){

		const found: any = await this.db.query('SELECT * FROM turnos WHERE id_profesional = ?', [id]);

		if(found)
		return found[0][0];
		return null;
	}

	async delete(id: string) {
		
		const turno= (await this.db.query('DELETE FROM turnos WHERE idVisita = ?', [id]))[0].affectedRows;
		console.log(turno);
		return turno;
	}

	async deleteAllTurns(){

		const turnos = (await this.db.query('TRUNCATE TABLE turnos'));
	}

async state(state:object){

	const result =(await this.db.query('INSERT into estado_turnos SET ?', [state]))[0].affectedRows
	console.log(result)
	return result;

}



}

const turnosModel: TurnosModel = new TurnosModel();
export default turnosModel;

