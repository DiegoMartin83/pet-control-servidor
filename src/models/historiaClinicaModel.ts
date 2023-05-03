import {createPool} from 'mysql2/promise';



export async function connect(){
	const connection = await createPool({
		host: 'localhost',
		port:3306,
		user: 'root',
     	password:'sanlorenzo',
		database: 'petcontroldb',
		connectionLimit: 10
	});
	return connection; //devolvemos el manejador de conexion
}

// import { createPool } from 'mysql2/promise';

class HistoriaClinicaModel {
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
	
	 //**********************************************
    //         Control Historias Clínicas           *
	//***********************************************
	
	//Users tasks
	

	async createClinicFile(hc: object) {
		const result = (await this.db.query('INSERT INTO historia_clinica SET ?', [hc]))[0].affectedRows;
		console.log(result);
		return result;
	}


	async listAllClinicFiles() {
		
		const clinicalFile = await this.db.query('SELECT hc.idHistoriaClinica ,m.nombre, m.especie, m.raza, hc.descripcion, hc.resumen FROM historiaclinica hc INNER JOIN mascota m ON hc.id_Animal = m.idAnimal');
	    return clinicalFile[0];
	}
	
	async listTurns() {
		const turnos = await this.db.query('SELECT t.idVisita, t.fechaVisita, t.horaVisita, t.nombre_mascota,t.id_mascota, t.idProfesional, et.estado FROM turnos t INNER JOIN estado_turno et ON t.estado = et.idEstado_turno');
		return turnos[0];
	} 
	// async listAllClinicFiles() {
		
	// 	const clinicalFile = await this.db.query('SELECT * FROM historia_clinica');
	//     return clinicalFile[0];
	// }

	async findClinicFileByID(id:string){
		const found = ( await this.db.query('SELECT * from historiaclinica WHERE idHistoriaClinica = ?', [id]));
		if (found.length > 1)
			return found[0][0];
		return null;
	}


	//RESOLVER ESTA CONSULTA, NECESITO MATCH ENTRE EL NUMERO DE ID DE MASCOTA INGRESADO AL MOMENTO DE CREAR HISTORIA CLINICA COSA QUE, CUANDO
	//INTENTE HACER EL MATCH TRAYENDO HISTORIAS CLINICAS PARA COMPARAR CON EL ID DE ANIMAL A VER SI YA HAY UNA HISTORIA CLINICA EXISTENTE CON ESE ID DE ANIMAL ME LO TOME
	//QUEDA MOMENTANEAMENTE CANCELADO EL METODO DE USER-CONTROLLER/CONTROL HISTORIAS CLINICAS "match2"
	async findClinicFileByPetID(id:string){
		const found =  await this.db.query('SELECT * from historia_clinica where id_animal =? ',[id]);
		if (found.length > 1)
			return found[0][0];
		return null;
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


	async updateClinicFile(hc: object, id: string) {
		const result = (await this.db.query('UPDATE historiaclinica SET  ?  WHERE idHistoriaClinica = ?', [hc, id]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro eliminar el registro de la mascota indicado por id
	async deleteClinicFile(id: string) {
		
		const file = (await this.db.query('DELETE FROM historia_clinica WHERE ID = ?', [id]))[0].affectedRows;
		console.log(file);
		return file;
	}


        
        // async listAllClinicFiles() {
        		
        //     const clinicalFile = await this.db.query('SELECT * FROM historiaclinica');
        //     return clinicalFile[0];
        // }
   

	//Devuelve un objeto cuya fila en la tabla mascotas coincide con el id.
	//Si no la encuentra devuelve null
	// async findPet(id: string) {
	// 	const found: any = await this.db.query('SELECT * FROM mascotas WHERE id = ?', [id]);
	// 	//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
	// 	if (found.length > 1)
	// 		return found[0][0];
	// 	return null;
	// }
	// //Devuelve un objeto cuya fila en la tabla mascotas coincide con el nombre.
	// //Si no la encuentra devuelve null
	// async findPetByName(nombre: string) {
	// 	const found: any = await this.db.query('SELECT * FROM mascotas WHERE nombre = ?', [nombre]);
	// 	//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
	// 	if (found.length > 1)
	// 		return found[0][0];
	// 	return null;
	// }

    //BUSCAR MASCOTAS SEGUN NOMBRE DE CLIENTE
	// async findPetByClientes(nombre: string) {
	// 	const found: any = await this.db.query('SELECT * FROM mascotas inner join  WHERE email = ?', [mail]);
	// 	//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
	// 	if (found.length > 1)
	// 		return found[0][0];
	// 	return null;
	// }

	//Devuelve 1 si logro crear un nuevo registro de la tabla mascotas


	//Devuelve 1 si logro actualizar el usuario indicado por id
	



}



const historiaClinicaModel:HistoriaClinicaModel = new HistoriaClinicaModel();
export default historiaClinicaModel;
