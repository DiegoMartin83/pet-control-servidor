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
	return connection; //devolvemos el manejador de conexion
}

// import { createPool } from 'mysql2/promise';

class EstudiosModel {
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
	

	async listarEstudios() {
		
		const estudios = await this.db.query('SELECT * FROM estudios');
	
		return estudios[0];
	}


	async buscarEstudioIdEstudio(id: string) {
		const foundS: any = await this.db.query('SELECT * FROM estudios WHERE idEstudio = ?', [id]);
		
		if (foundS.length > 1)
			return foundS[0][0];
		return null;
	}


	async buscarEstudioPorIdAnimal(id:string){

		
		const found:any = await this.db.query('SELECT * FROM estudios WHERE id_animal = ?', [id])
		if(found.length>1)
		return found[0][0];
		return null
	}

	async buscarNombre(nombre: string) {
		const foundNameS: any = await this.db.query('SELECT nombreEstudio FROM estudios');
		
		if (foundNameS.length > 1)
			return foundNameS[0][0];
		return null;
	}


	
	async crear(estudio: object) {
		const result = (await this.db.query('INSERT INTO estudios SET ?', [estudio]))[0].affectedRows;
		console.log(result);
		return result;
	}

	
	async actualizar(estudio: object, id: string) {
		const result = (await this.db.query('UPDATE estudios SET ? WHERE IdEstudio = ?', [estudio, id]))[0].affectedRows;
		console.log(result);
		return result;
	}

	
	async eliminar(idEstudio: string) {
		
		const estudio = (await this.db.query('DELETE FROM estudios WHERE IdEstudio = ?', [idEstudio]))[0].affectedRows;
		return estudio;
	}
        async consultaEstudioMascota(id:string){
            return 0;
        }

	
}



const estudiosModel: EstudiosModel = new EstudiosModel();
export default estudiosModel;

