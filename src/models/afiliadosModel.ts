import {createPool} from 'mysql2/promise';
import  bcryptjs from 'bcryptjs';


export async function connect(){
	const connection = await createPool({
		host: 'localhost',
		port:3306,
		user: 'root',
     	password:'sanlorenzo',
		database: 'petcontrol',
		connectionLimit: 10
	});
	return connection; //devolvemos el manejador de conexion
}

// import { createPool } from 'mysql2/promise';

class AfiliadosModel {
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
	
	     //************************************
	    //         Control Afiliados          *
	    //*************************************

		async create(afiliado: object) {
			const result = (await this.db.query('INSERT INTO afiliados SET ?', [afiliado]))[0].affectedRows;
			console.log(result);
			return result;
		}
	async listarAfiliados() {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		const usuarios = await this.db.query('SELECT * FROM afiliados');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return usuarios[0];
	}


	async buscarAfiliadosById(id: string) {
		const encontrado: any = await this.db.query('SELECT * FROM afiliados WHERE id = ?', [id]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	async findAfiByDocument(dni: string) {
		const found: any = await this.db.query('SELECT * FROM afiliados WHERE dni = ?', [dni]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (found.length > 1)
			return found[0];
		return null;
	}
	
	async findAfiBySurname(nombre: string) {
		const encontrado: any = await this.db.query('SELECT * FROM afiliados WHERE apellido = ?', [nombre]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}
	async getAfiByMail(mail: string) {
		const found  = await this.db.query('SELECT * FROM afiliados a  JOIN mascotas  m on a.idAfiliado = m.id_afiliado WHERE email = ?', [mail]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (found.length > 1)
			return found[0][0];
		return null;
	}

	


	//Devuelve 1 si logro actualizar el afiliado indicado por id
	async updateAfiliado(afiliado: object, id: string) {
		const result = (await this.db.query('UPDATE afiliados SET ? WHERE idAfiliado = ?', [afiliado, id]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro eliminar el afiliado indicado por id
	async eliminar(id: string) {
		
		const afiliado = (await this.db.query('DELETE FROM afiliados WHERE idAfiliado = ?', [id]))[0].affectedRows;
		console.log(afiliado);
		return afiliado;
	}



}



const afiliadosModel: AfiliadosModel = new AfiliadosModel();
export default afiliadosModel;

