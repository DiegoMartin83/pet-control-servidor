import {createPool} from 'mysql2/promise';
import  bcryptjs from 'bcryptjs';


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

class MascotasModel {
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
	async listPets() {
		// const pets= await this.db.query('SELECT  idAnimal, nombre, especie, raza, color, sexo, telefonoDuenio  FROM mascota;');

		const pets= await this.db.query('SELECT  *,TIMESTAMPDIFF(YEAR,fechaDeNacimiento,CURDATE()) AS edad FROM mascota');
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (pets.length > 1)
			return pets[0];
	
	}
	

	async findPetByIDAfi(id:string){

		const pet = await this.db.query('SELECT * FROM mascotas  WHERE id_afiliado = ?', [id]);

		if(pet.length > 1){
			return pet[0][0];
		}

		return null;
	}


	async findPetByID(id: string) {
		const found: any = await this.db.query('SELECT * FROM mascota WHERE idAnimal = ?', [id]);
		
		if (found.length > 1)
			return found[0][0];
		return null;
	}

	async matchPetFile(id:string){
		const found:any = await this.db.query('SELECT * FROM mascotas m INNER JOIN historia_clinica h ON m.idMascota = h.id_animal WHERE m.idMascota=?', [id])
		if(found.length > 1)
		return found[0][0];
		return null;
	}

	

	async getPetAge (id:string){
		const petAge : any = await this.db.query('SELECT TIMESTAMPDIFF(YEAR,fecha_nacimiento,CURDATE()) AS Edad FROM from mascotas WHERE idMascota = ?', [id])
		if(petAge.length > 1)
		return petAge[0];
	}

	async findPetByName(nombre: string) {
		const found: any = await this.db.query('SELECT * FROM mascota WHERE nombre = ?', [nombre]);
		
		if (found.length > 1)
			return found[0][0];
		return null;
	}

	async findPetBySpecies(especie:string){
		const found: any = await this.db.query('SELECT * FROM mascotas WHERE especie = ?', [especie]);
		if(found.length > 1)
		return found[0];
		return null;
	}

async findPetByDNIonr (dni:string){
	const found: any = await this.db.query('SELECT * FROM mascota WHERE dniDuenio = ?', [dni]);
	if(found.length > 1)
	return found[0];
	return null;

}

	//Consulta
    //listar tabla
	//Consulta a Juan 
	 async findMatchPetAfiliado() {

		
	 	const foundPet = await this.db.query('SELECT * FROM mascotas  m  INNER JOIN  afiliados  a ON m.id_afiliado = a.idAfiliado');
 	
	 return foundPet[0];
		 
	
	 }

	
	async create(newPet: object) {
		const result = (await this.db.query('INSERT INTO mascota SET ?', [newPet]))[0].affectedRows;
		console.log(result);
		return result;
	}

	async update(pet: object, id: string) {
		const result = (await this.db.query('UPDATE mascota SET ? WHERE idAnimal = ?', [pet, id]))[0].affectedRows;
		console.log(result);
		return result;
	}


	async delete(id: string) {
		
		const pet = (await this.db.query('DELETE FROM mascota WHERE idAnimal = ?', [id]))[0].affectedRows;
		console.log(pet);
		return pet;
	}



}



const mascotasModel:MascotasModel = new MascotasModel();
export default mascotasModel;
