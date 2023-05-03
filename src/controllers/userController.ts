import {Request, Response} from 'express';
import userModel from '../models/userModel';
import afiliadosModel from '../models/afiliadosModel';
import mascotasModel from '../models/mascotasModel';
import turnosModel from '../models/turnosModel';

import historiaClinicaModel from '../models/historiaClinicaModel';

import flash from "connect-flash";
import jwt from "jsonwebtoken";


const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');



class UserController{

	

	//registro
	public signup(req:Request,res:Response){
		console.log(req.body);
        //res.send('Sign Up!!!');
		res.render("partials/signupForm");
	}

	
	// //CRUD
	// public async list (req:Request,res:Response){
	// 	console.log(req.body);
    //     const usuarios = await userModel.listar();
    //     console.log(usuarios);
    //     return res.json(usuarios);
    //     //res.send('Listado de usuarios!!!');
	// }
	
	// public async find(req:Request,res:Response){
	// 	console.log(req.params.id);
    //     const { id } = req.params;
    //     const usuario = await userModel.findByID(id);
    //     if (usuario)
    //         return res.json(usuario);
    //     res.status(404).json({ text: "User doesn't exists" });
	// }





    //==================================================================================================================================================================






    //***********************************************
    //                Control Afiliados             *
	//***********************************************

    public async listadoAfiliados(req: Request, res: Response) {
        /*   console.log(req.body);
          console.log(req.header("Authorization")); *///Observamos el valor del token
        const afiliados = await afiliadosModel.listarAfiliados();
        return res.json(afiliados);
    }


      //==================================================================================================================================================================


    //     TURNOS COMPLETADO  14/07/22
    //***********************************************
    //                Control Turnos                *
	//***********************************************


    //CREA TURNO
    public async asignarTurno(req:Request, res: Response){
        
        console.log(req.body);
        try{ 
   
           const turno=req.body;
           const result= await turnosModel.create(turno);
            // console.log(turno);
         //   res.render("partials/testTurno");
            return res.status(200).json({ message: 'Turno agendado con éxito: ', result });
        }catch(error){
   console.log(error);
           return res.status(400).json({message:"Ha ocurrido un error inesperado :/", error})
        }
        
   
     }


//     public async listadoTurnos(req: Request, res: Response) {
//         console.log(req.body);
//         console.log(req.header("Authorization")); ///Observamos el valor del token
//       const turnos = await turnosModel.listTurns();
//       console.log(turnos);
//       return res.json(turnos)
//       return res.status(200).json(turnos);
//   }

    //LISTA TURNOS
      public async listadoTurnos(req: Request, res: Response) {


            const result = await turnosModel.listTurns();
    
            try{ 
                if(result){
    
                    return res.status(200).json(result);
                }
                    return res.status(404).json({message: 'No se encontraron turnos activos!!'})
    
        }catch(error){
            return res.status(400).json({message:'Ha ocurrido un error inesperado :/', error});
        }
        
    // try{ 

        // const { usuario, password } = req.body;
    //     const result = await userModel.findMail(usuario);
    //     if(result.rol!="User" || result.rol!="Admin" ){

    //         res.status(403).json({message: "Ups! Parece que estas intentando acceder a una sección exclusiva de usuarios, debes iniciar sesión!"})
    //     }else{
    //         console.log(req.body);
    //         //  console.log(req.header("Authorization")); *///Observamos el valor del token
    //         const turnos = await turnosModel.listTurns();
    //         console.log(turnos);
    //         // return res.json(turnos)
    //         return res.status(200).json(turnos);
    //     }
    // }catch(e){
    //     res.status(400).json({mssagge:'Ha ocurrido un error ineserado :/', e})
    // }
  
    
  
 }

//  const hc = req.body;
//  const {id_animal} = req.body;

//  console.log(id_animal);
//  console.log(req.body);
//  console.log(req.params);
//   const match = await historiaClinicaModel.findClinicFileByPetID(id_animal)

//   if(match) {
//      return res.status(403).json({message: 'Ya existe una ficha con el numero de mascota ingresado'});
//   }
//  const match2 = await mascotasModel.findPetByID(id_animal);



    // MODIFICA TURNO  
    public async modificarTurno(req: Request, res: Response) {
        console.log(req.body);

        
        const {id} = req.params; 
        const result = await turnosModel.getTurnById(id);

        console.log(id);

        console.log(req.params);
       try{
           
         if(!result){

             return res.status(400).json({message:'No hay turnos activos con el numero ingresado'});
         }
            const { id } = req.params;
            await turnosModel.updateTurns(req.body, id);
            return res.status(200).json({message:"Turno actualizado con éxito!!"})
      
      

       }catch(err){

        return res.status(400).json({message:"Ha ocurrido un error inesperado :/ "})
        console.log(err)
       }
        
       
    }

    public async modificarTurnoaEstado1(req: Request, res: Response) {
        console.log(req.body);

        
        const {id} = req.params; 
        const result = await turnosModel.getTurnById(id);

        console.log(id);

        console.log(req.params);
       try{
           
         if(!result){

             return res.status(400).json({message:'No hay turnos activos con el numero ingresado'});
         }
            const { id } = req.params;
            await turnosModel.changeStateActive(id);
            return res.status(200).json({message:"Turno actualizado con éxito!!"})
      
      

       }catch(err){
        console.log(err)

        return res.status(400).json({message:"Ha ocurrido un error inesperado :/ "})
       }
        
       
    }
    
	
	
	

    public async modificarTurnoaEstado2(req: Request, res: Response) {
        console.log(req.body);

        
        const {id} = req.params; 
        const result = await turnosModel.getTurnById(id);

        console.log(id);

        console.log(req.params);
       try{
           
         if(!result){

             return res.status(400).json({message:'No hay turnos activos con el numero ingresado'});
         }
            const { id } = req.params;
            await turnosModel.changeStateEnd(id);
            return res.status(200).json({message:"Turno actualizado con éxito!!"})
      
      

       }catch(err){

        console.log(err);
        return res.status(400).json({message:"Ha ocurrido un error inesperado :/ "})
       }
        
       
    }
    public async modificarTurnoaEstado3(req: Request, res: Response) {
        console.log(req.body);

        
        const {id} = req.params; 
        const result = await turnosModel.getTurnById(id);

        console.log(id);

        console.log(req.params);
       try{
           
         if(!result){

             return res.status(400).json({message:'No hay turnos activos con el numero ingresado'});
         }
            const { id } = req.params;
            await turnosModel.changeStateToCancel( id);
            return res.status(200).json({message:"Turno actualizado con éxito!!"})
      
      

       }catch(err){

        console.log(err);
        return res.status(400).json({message:"Ha ocurrido un error inesperado :/ "})
        
       }
        
       
    }
    public async modificarTurnoaEstado4(req: Request, res: Response) {
        console.log(req.body);

        
        const {id} = req.params; 
        const result = await turnosModel.getTurnById(id);

        console.log(id);

        console.log(req.params);
       try{
           
         if(!result){

             return res.status(400).json({message:'No hay turnos activos con el numero ingresado'});
         }
            const { id } = req.params;
            await turnosModel.changeStatePosp(id);
            return res.status(200).json({message:"Turno actualizado con éxito!!"})
      
      

       }catch(err){
        console.log(err);
        return res.status(400).json({message:"Ha ocurrido un error inesperado :/ "})
       }
        
       
    }

    //BUSCA TURNO POR ID DE VISITA
    public async  buscarTurnosPorId  (req: Request, res: Response){
     
        //desglose o destructura del objeto
        const {id} = req.params;
        console.log(req.body);
        
        const found = await turnosModel.getTurnById(id);

        try{
            if(found) 
            return res.json(found);
        res.status(400).json({message: "No se encontraron turnos activos con el número asignado!!"});

        }catch(error){
            return res.status(403).json({message: 'Ha ocurrido un error inesperado :/',  error});
        }
       
        

    }


    //  public async buscarTurnoPorNombre(req: Request, res: Response){

    //      const {nombre} = req.params;
    //      const nombreMascota = await mascotasModel.findPetByName(nombre);
         

    //      if(!nombreMascota){

    //         return res.status(404).json({message:'No se encontraron mascotas registradas con el nombre ingresado'});

    //      }else{

    //         const {nombre_mascota} = req.params;
    //         const turnoNombreMascota = await turnosModel.turnByPetName(nombre_mascota);
    //         return res.json(turnoNombreMascota);
    //      }
         
    //  }

    //BUSCA TURNO POR NOMBRE DE MASCOTA
    public async buscarTurnoPorNombre(req: Request, res: Response){

        const {nombre} = req.params;
        const result = await turnosModel.turnByPetName(nombre);

        if(result){
            return res.status(200).json(result);
        }

        else{ 

            return res.status(404).json({message:'No hay turnos activos con el nombre de mascota ingresado'})
        }
           
        
        
    }

    //BUSCA TURNO POR ID DE MASCOTA
    public async buscarTurnoPorIdMascota(req: Request, res: Response){

        const {id} = req.params;
        const result = await turnosModel.getTurnByPetID(id);

        try{ 

            if(result){
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({message:'No hay turnos activos con el número de mascota ingresado'});
            }
           

        }catch(err){
            return res.status(403).json({message:'Ha ocurrido un error inesperado :/ '});
        }
    }


    // BUSCA TURNO POR ID DE PROFESIONAL
    public async buscarTurnoPorProfesional(req: Request, res: Response){

        const {id} = req.params;
        const found = await turnosModel.getTurnByProfID(id);

        try{ 
            if (found){
                return res.status(200).json(found)
            }
            return res.status(403).json({message:'No se han encontrado turnos asignados al médico seleccionado'});
        }catch(error){

            return res.status(403).json({message: 'Ha ocurrido un error inesperado', error});
        }
        //SRC pend
    }

    //INGRESA ESTADO DE TURNO (PENDIENTE, CONSUMADO, CANCELADO)

    public async estado (req: Request, res: Response){

        const {estado} = req.body;

        try{
            const result = await turnosModel.state(estado);
            return res.status(200).json({message:'Estado de turno cambiado', result});
        }catch(err){

            return res.status(400).json({message:'Ha ocurrido un error inesperado!', err})


        }
        
    }
    //ELIMINA FISICAMENTE TURNO SELECCIONADO POR ID
    public async eliminarTurno (req: Request, res: Response){
        
             
          const { id } = req.params; 
          const result = await turnosModel.delete(id);
          return res.status(200).json({ message: 'El turno ha sido removido con éxito!' });
        

    }

    // ELIMINA FISICAMENTE TODOS LOS TURNOS
    public async eliminarTurnos(req: Request, res: Response){


        try{ 

            const found = await turnosModel.listTurns();

            if(found.length > 0){
                await turnosModel.deleteAllTurns();
                return res.status(200).json({ message:'Se ha removido la totalidad de los turnos activos'})
            }else {
            
                    return res.status(400).json({message:'No se encontraron turnos activos'});
                  }
       

        }catch(e){
            res.status(404).json({message:'A ocurrido un error inesperado :/', e})
        }
        

      
    }


   
	
   //===========================================================================================================================================================================/
   
	
	


    //*************************************
    //         Control Mascotas           *
    //*************************************


    // DA DE ALTA UNA MASCOTA
    public async altaMascota(req:Request, res: Response){
    
       
        
        try{ 
    

            const {nombre} = req.body;
            const {dniDueño} = req.body;

            const match1 = await mascotasModel.findPetByName(nombre);
            const match2 = await mascotasModel.findPetByDNIonr(dniDueño);
    
            if(match1){
                if(match2){
                    return res.status(403).json({message:"La mascota ingresada ya existe en la base de datos del sistema."});
                }
                
            }
            else{ 
                const mascota = req.body;
            const result = await mascotasModel.create(mascota);
            console.log(mascota);


            return res.status(200).json({message: 'Se ha dado de alta a la mascota: ' , result});
            }
            
        }catch(e){
            return res.status(403).json({message: 'Ha ocurrido un error inesperado!', e})
        }
        
    }

    // LISTA TODA LAS MASCOTAS
    public async listarMascotas(req: Request, res: Response) {
    
      console.log(req.body);
      const result = await mascotasModel.listPets();
      return res.json(result);
  }


        public async buscarMascotaPorId(req: Request, res: Response){

                //desglose o destructura del objeto
                const {id} = req.params;
                console.log(req.body);
                const found = await mascotasModel.findPetByID(id);

                try{
                    if(found){
                        return res.status(200).json(found);
                    
                    }
                    if(!found){
                        
                        return res.status(403).json({message:'No existen mascotas con el numero de identificador ingresado!'});

                    }
                }catch(error){

                    return res.status(403).json({message:'Ha ocurrido un error inesperado :/', error});
                }
             
                
        
            
        
        }


        // FILTRA MASCOTA SEGUN ID DE AFILIADO
        public async traerMascotaPorIdAfiliado (req: Request, res: Response){
     
            console.log(req.body);
            
            const petAfi = await mascotasModel.findMatchPetAfiliado();
            if(petAfi) 
                return res.json(petAfi);
            res.status(400).json({message: "No se encontraron datos!!"});
            
    
        }
        //Control actual
        public async buscarMascotaPorIdAfiliado(req: Request, res: Response){
        
            const {id} = req.params;
            const found = await mascotasModel.findPetByIDAfi(id);

            try{

                if(found){

                    return res.status(200).json(found)
                }
                    return res.status(404).json({message:'No existen mascotas asociadas a ningun afiliado con el número ingresado!'});
                
                   
                //console.log(first)
                   
                
            }catch(error){

                return res.status(403).json({message:'Ha ocurrido un error inesperado :/', error})
            }
            
        }


        


        public async buscarMascotaPorEspecie(req: Request, res: Response){
        //src pend

        const {especie} = req.params;
        const found = await mascotasModel.findPetBySpecies(especie)

            try{
                if(found){
                    return res.status(200).json(found)
                }
    
                return res.status(404).json({message:'No se encontraron mascotas de la especie solicitada!'});
            } catch(err){
                return res.status(403).json({message:'Ha ocurrido un error inesperado :/'});
            }

        }


        public async actualizarMascota(req: Request, res: Response){
        
                console.log(req.body);
                const { id } = req.params;
               
                await mascotasModel.update(req.body, id);
                return res.status(200).json({message:"La información de la mascota se actualizó correctamente!"})
               
            
        
          }


          public async eliminarMascota(req: Request, res: Response){
            console.log(req.body);
            const {id} = req.params;
            const result = await mascotasModel.delete(id);
            return res.status(200).json({ message: 'El turno ha sido removido con éxito!' });
            


          }


    

    
   
	
 




  

    // public showError(req: Request, res: Response){
    //     // res.send({ "Usuario y/o contraseña incorrectos": req.body });
    //     res.render("partials/error");

    // }
	//FIN CRUD
		// public notSignedUp(req:Request,res:Response){
		// 	console.log(req.body);
		// 	res.render("partials/notSignedUp");
		// }
        

        // public async updateV(req: Request, res: Response) {
        //         const { id } = req.params;
        //         const result = await userModel.buscarId(id);
        //         res.render('partials/update', { user: result });
        //     }

          

            // public async getPets (req:Request, res: Response){
            //     const { id } = req.params;

            //     // if()



            // }

           

               //**********************************************
               //        Control Historias clínicas           *
              //***********************************************
            
         

              public async crearHistoria(req: Request, res: Response){


                const hc = req.body;
                const {id_animal} = req.body;

                console.log(id_animal);
                console.log(req.body);
                console.log(req.params);
                 const match = await historiaClinicaModel.findClinicFileByPetID(id_animal)

                 if(match) {
                    return res.status(403).json({message: 'Ya existe una ficha con el numero de mascota ingresado'});
                 }
                const match2 = await mascotasModel.findPetByID(id_animal);


                if(match2) {

                    
                        try{ 
                            const hc = req.body;
                            const result = await historiaClinicaModel.createClinicFile(hc);
                            console.log(hc);
                            return res.status(200).json({message: 'Se ha registrado una nueva historia clinica: ' , result});
                        }catch(e){
                            return res.status(403).json({message: 'Ha ocurrido un error inesperado!', e})
                        }
    

                }
                else{

                    return res.status(404).json({message: 'No es posible añadir una ficha clínica, no se ha registrado ningun animal con el numero de ficha ingresado'});
                }
                 
                //DE PRUEBA MOMENTANEO, UNA VEZ SOLUCIONADO EL METODO DE ARRIBA, SE REEMPLAZA
                // try{ 
                //                 const hc = req.body;
                //                 const result = await historiaClinicaModel.createClinicFile(hc);
                //                 console.log(hc);
                //                 return res.status(200).json({message: 'Se ha registrado una nueva historia clinica: '});
                //             }catch(error){
                //                 return res.status(403).json({message: 'Ha ocurrido un error inesperado!', error})
                //             }
        

              }


            //   public async listarFichas(req: Request, res: Response){

            //     const result = await historiaClinicaModel.listAllClinicFiles();

            //     try{ 
                
            //         if(result.length > 0){


            //             return res.json(result);
            //         }else{

            //             return res.status(404).json({message:'Listado vacío!'})
            //         }
                   

            //     }catch(error){
            //         return res.status(403).json({message: 'Ha ocurrido un error inesperado :/'});
            //     }
                
                
            //   }
                 public async listarFichas(req: Request, res: Response){

                const result = await historiaClinicaModel.listAllClinicFiles();

                try{ 
                
                    if(result.length > 0){


                        return res.json(result);
                    }else{

                        return res.status(404).json({message:'Listado vacío!'})
                    }
                   

                }catch(error){
                    return res.status(403).json({message: 'Ha ocurrido un error inesperado :/'});
                }
                
                
              }

              
              public async listarFichaPorId(req: Request, res: Response){
                        
                    const {id} = req.params;
                    const result = await historiaClinicaModel.findClinicFileByID(id)
                    if(result){
                        return res.status(200).json(result);
                    }
                    return res.status(400).json({message:'No se encontraron fichas con el numero ingresado'});



        }

        public async modificarHistoria(req: Request, res: Response) {
            console.log(req.body);
    
            
            const {id} = req.params; 
            const result = await historiaClinicaModel.updateClinicFile( req.body, id);
            if(result){
                return res.status(200).json({message:'Historia actualizada'});
            }
            console.log(result);

    
           
            
           
        }

            // public async control (req:Request,res:Response){
            //     //res.send('Controles');
            //     if(!req.session.auth){
            //        req.flash('error_session','Debes iniciar sesion para ver esta seccion');
            //        res.redirect("./error");
            //        // res.redirect("/");
            //    }
           
            //     const usuarios = await userModel.listar();
            //     const users = usuarios;
            //     res.render('partials/controls', { users: usuarios });
           
            //    }
           
            //    public async procesar (req:Request,res:Response){
            //        console.log(req.body);
            //        if(!req.session.auth){
            //            // res.redirect("/");
            //            req.flash('error_session','Debes iniciar sesion para ver esta seccion');
            //            res.redirect("./error");
            //        }
            //        console.log(req.body);
           
            //        let usuario=req.body.usuario;
            //        var usuarios:any=[];
            //        console.log(usuario);
            //        if(usuario.length>0){
            //            for(let elemento of usuario){
            //                const encontrado = await userModel.findByID(elemento);
            //                if (encontrado){
            //                    usuarios.push(encontrado);
            //                    console.log(encontrado);
            //                }
                               
            //            }
            //        }
            //        console.log(usuarios);
            //        res.render("partials/seleccion",{usuarios,home:req.session.user,mi_session:true});
            //        // res.send('Recibido!!!');
            //    }

               
      //************************************
     //         Auth-Sessions              *
    //**************************************

      //Controller 
 
      public async traerData_(req:Request, res: Response){
    
      console.log(req.params.id);
      const {id} = req.params
      console.log(id);
      const result = await userModel.findUserByID_(id)
      res.status(200).json(result);
      return;
      }



    //   public async traerData(req:Request, res: Response){

    //     const {id} = req.params
  
    //     const result = await userModel.findUserByID_(id)
    //     return res.status(200).json(result);
    //     }


      public async actualizarData(req: Request, res: Response){
          
        const {id} = req.params;
          console.log(req.body);


        const {nombre, apellido, telefono,dni, celular, domicilio, email, password, rol} = req.body;

        try{

            const result = await userModel.updateUser( id,nombre, apellido, telefono,dni, celular, domicilio, email, password);
            
            return res.status(200).json({mssagge:'Sus datos han sido actualizados con éxito!'});

        }catch(e){
                    console.log(e);
        }
       
      }

    public endSession(req: Request, res: Response){
        console.log(req.body);
        req.session.user={};
        req.session.auth=false;
        req.session.destroy(()=>console.log("Session finalizada"));
        res.redirect("/");
    }

           

}

const userController = new UserController(); 
export default userController;

  








