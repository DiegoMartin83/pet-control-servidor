import {createPool} from 'mysql2/promise';



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

class ContactUsModel {
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

    async crearConsulta(contacto: object) {		
		const result = (await this.db.query('INSERT INTO contacto SET ?', [contacto]))[0].affectedRows;
		
		return result;		
	
	}

	async listarConsultas(){
		const consultas = (await this.db.query('SELECT * FROM contacto'));
		return consultas[0];
	}
	
	async deleteQuery(id: string) {
		
		const query = (await this.db.query('DELETE FROM contacto WHERE idcontacto = ?', [id]))[0].affectedRows;
		console.log(query);
		return query;
	}

}


const contactUsModel: ContactUsModel = new ContactUsModel();
export default contactUsModel;

