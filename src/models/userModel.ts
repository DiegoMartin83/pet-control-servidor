import {createPool} from 'mysql2/promise';
import  bcryptjs from 'bcryptjs';


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
	

	async list() {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		const usuarios = await this.db.query('SELECT id, nombre, apellido, dni, telefono, celular, domicilio, email, rol, perfil FROM usuarios');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return usuarios[0];
	}

	//Devuelve un objeto cuya fila en la tabla usuarios coincide con id.
	//Si no la encuentra devuelve null
	async findUserByDNI(dni: string) {
		const encontrado: any = await this.db.query('SELECT id, nombre, apellido, dni, telefono, celular, domicilio, email, rol, perfil, fecha_nacimiento FROM usuarios WHERE dni = ?', [dni]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	async findUserByID_(id:string){
		const found = (await this.db.query('SELECT *  FROM usuarios WHERE id = ?', [id]));
		return found[0][0];
		
		
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
	async findUserByID(id:string){
		const found: any = await this.db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
		if(found.length > 0){
			return found[0][0];
		}
		return null;
	}
	//Devuelve un objeto cuya fila en la tabla usuarios coincide con nombre.
	//Si no la encuentra devuelve null
	async findUserByName(apellido: string) {
		const encontrado: any = await this.db.query('SELECT * FROM usuarios WHERE apellido = ?', [apellido]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}
	async findUserByMail(mail: string) {
		const found: any = await this.db.query('SELECT * FROM usuarios WHERE email = ?', [mail]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (found.length > 1)
			return found[0][0];
		return null;
	}

	async findMail(mail: string) {
		const found: any = await this.db.query('SELECT * FROM usuarios WHERE email = ?', [mail]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (found.length > 1)
			return found[0][0];
		return null;
	}


	async deleteUsers(id: string) {
		
		const user = (await this.db.query('DELETE FROM usuarios WHERE ID = ?', [id]))[0].affectedRows;
		console.log(user);
		return user;
	}
	//Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
	async create(usuario: object) {
		const result = (await this.db.query('INSERT INTO usuarios SET ?', [usuario]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro actualizar el usuario indicado por id
	// async updateUser(usuario: object, id: string) {
	// 	const result = (await this.db.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, id]))[0].affectedRows;
	// 	console.log(result);
	// 	return result;
	// }


	//Model
	async updatePass (usuario:object, id:string){
		const result = (await this.db.query('UPDATE usuarios SET password = ? WHERE id = ? ', [usuario, id]))[0].affectedRows;
		return result;
	}

	async updateUser( id:string,nombre:string, apellido:string, telefono:string,dni:string, celular:string, domicilio:string, email:string, password:string){
		const result = (await this.db.query('UPDATE usuarios SET  nombre = ? , apellido = ? , dni = ?, telefono = ? , celular = ? , domicilio = ? , email = ? ,password = ?   WHERE id = ?', [nombre, apellido,dni,  telefono, celular,domicilio, email, password, id]))[0].affectedRows;
		return result;

	}

	// async updateUser( id:string,nombre:string, apellido:string, telefono:string,dni:string, celular:string, domicilio:string, email:string, password:string){
	// 	const result = (await this.db.query('UPDATE usuarios SET  nombre = ? , apellido = ? , dni = ?, telefono = ? , celular = ? , domicilio = ? , email = ? ,password = ?   WHERE id = ?', [id,nombre, apellido,dni,  telefono, celular,domicilio, email, password]))[0].affectedRows;
	// 	return result;

	// }

	// async updateUser( user:object, id:string){
	// 	const result = (await this.db.query('UPDATE usuarios SET  ?   WHERE id = ?', [id,user]))[0].affectedRows;
	// 	return result;

	// }

	async deleteUser(id:string){
		const user = (await this.db.query('DELETE  FROM usuarios WHERE id = ?', [id]))[0].affectedRows;
		console.log(user);
		return user;
	}



	 encriptPass = async(password: string): Promise<string> => {
        const salt = await bcryptjs.genSalt(10);
        return await bcryptjs.hash(password, salt);
    }

	
	validarPassword = async function (password: string, passwordHash: string): Promise<boolean> {		
        return await bcryptjs.compare(password, passwordHash);
    }




}

//Exportamos el enrutador con 

const userModel: UserModel = new UserModel();
export default userModel;




