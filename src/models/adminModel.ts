// import {createPool} from 'mysql2/promise';
    
//      class AdminModel {


//         private db: any;
//         constructor() {
//             this.config(); //aplicamos la conexion con la BD.
//         }
    
//         async config() {//Parametro de conexion con la BD.
//             this.db = await createPool({
//                 host: 'localhost',
//                 user: 'root',
//                 password: 'sanlorenzo',
//                 database: 'petcontroldb',
//                 connectionLimit: 10
//             });
             
//         }

//         //ELIMINAR USUARIOS
//         async deleteUsers(id: string) {
		
//             const user = (await this.db.query('DELETE FROM usuarios WHERE ID = ?', [id]))[0].affectedRows;
//             console.log(user);
//             return user;
//         }

//         async deleteAfiliados (id:string){
//             const afi = (await this.db.query('DELETE FROM afiliados WHERE idAfiliado =?'))[0].affectedRows;
//             return afi;
//         }

//         // AGREGAR USUARIOS O PERFILES (ESTILO NTFLX) STAND BY EN ESPERA DEL OK SEGUN ESTRUCTURA
//         // addUser(user:object){

//         // }

//      }
    
//      const adminModel: AdminModel = new AdminModel();
//      export default adminModel;
//     //Devuelve 1 si logro eliminar el usuario indicado por id
	