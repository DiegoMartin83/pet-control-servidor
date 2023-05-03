import {Request, Response } from 'express';
import userModel from '../models/userModel';
import flash from "connect-flash";
import jwt from "jsonwebtoken";
//const nodemailer = require('nodemailer');
import {transporter} from '../config/mailer'
import config from '../config/config';
const dtenv = require('dotenv');


class AuthController{
    public async login(req: Request, res: Response) {
        const { usuario, password } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await userModel.findMail(usuario);
        console.log(usuario, password);
        if (!result) {
			console.log(result);
            return res.status(404).json({ message: "Usuario y/o contraseña incorrectos!!" });
           
        }else{
             const passOk = await userModel.validarPassword(password, result.password);
 

            if (result.password== password && result.email == usuario) {
                
                
                if (result?.rol === "admin") {
                    req.session.admin = true;
                    // res.status(200).json({mssagge:"login admin ok!"});
                   
                }
                req.session.admin = false;

				if(result?.perfil==='Administrativo'){
					console.log("resultado",result);
					req.session.administrativo=true;
					const token: string = jwt.sign({_id:result.id, perfil:"Adm"}, config.SECRETORPRIVATEKEY, {expiresIn:'1h'});
					return res.status(200).json({mssagge: "Bienvenido " +  result.nombre, token:token, rol:result.rol, perfil:result.perfil, id:result.id});
				}

				if(result?.perfil==='Veterinario'){
					console.log("resultado",result);
					req.session.administrativo=true;
					const token: string = jwt.sign({_id:result.id, perfil:"Vet"}, config.SECRETORPRIVATEKEY, {expiresIn:'1h'});
					return res.status(200).json({mssagge: "Bienvenido " +  result.nombre, token:token, rol:result.rol, perfil:result.perfil, id:result.id});
				}
                
                //  res.status(200).json({mssagge:"login user ok!"});
    
             console.log("resultado",result);
                  const token: string = jwt.sign({ _id: result.id } ,config.SECRETORPRIVATEKEY, {expiresIn: '1h'});
                 return res.status(200).json({ message: " Bienvenido" + result.nombre, token: token, rol:result.rol, perfil:result.perfil, id:result.id});
            }

            if (result.email != usuario || result.password != password) {
                return res.status(403).json({message:"Usuario y/o contraseña incorrectos!!"})
            }
            console.log(res);
       
        }


       
    }

    public async restorePwd(req:Request, res:Response){
        const usuario = req.params;

    }
    public async addUser(req:Request,res:Response)
    {
		const usuario = req.body;
        delete usuario.repassword;
        console.log(req.body);

        const patternName = /^[A-Z][A-Za-z]{3,14}$/;
		const patternSurname = /^[A-Z][A-Za-z]{3,14}$/;
		const patternPass = /^[A-Z][A-Za-z0-9]{6,20}$/;
		const patternMail = /[a-z0-9]{1,14}@[a-z0-9]{1,10}.[a-z]{2,3}/;
		const patternDOC = /^[0-9]{7,9}$/;
		const patternTel = /^[0-9]{8,10}$/;
		const patternCel = /^[0-9]{8,10}$/;
		const patternFile = /^[0-9]{7,9}$/;
		const patternEnroll = /^[0-9]{7,9}$/;

    //     	//MAIL
		// if ((usuario.email.length == 0)){
		// 	return res.status(403).json({ message: "No ha ingresado ningun MAIL!!" });
		// }
		// if ((usuario.email.length > 27)){
		// 	return res.status(403).json({ message: "Excedió el limite maximo(27) de caracteres para el campo MAIL!!" });
		// }
		// if ((usuario.email.length < 5)){
		// 	return res.status(403).json({ message: "El campo debe contener al menos 5 caracteres" });

		// }

		// if (!patternMail.test(usuario.email)){
		// 	return res.status(403).json({ message: "Formato no válido de correo, el formato debe ser ejemplo@mail.com"});
		// }


	
		
		
	// 	//FUNCIONAN LAS VALIDACIONES
	// 	// FIN MAIL

		
		//CONTRASEÑA
		 if ((usuario.password.length == 0)) {
			return res.status(403).json({ message: "No ha ingresado ninguna CONTRASEÑA!!" });
		 }
		 if ((usuario.password.length > 20)) {
			return res.status(403).json({ message: "Excedió el limite maximo (20) de caracteres para el campo CONTRASEÑA!!" });
		 }
		 if ((usuario.password.length < 6)) {
		 	return res.status(403).json({ message: "La contraseña debe de contener entre 6 y 20 caracteres!!" });
		 }
		
		if (!patternPass.test(usuario.password)){
			return res.status(403).json({ message: "Clave inválida!!, debe contener al menos un numero y una mayúscula"});
		}
    
	// 	//FUNCIONAN LAS VALIDACIONES
	// 	// FIN CONTRASEÑA


	// 	 //NOMBRE
	// 	 if (usuario.nombre.length == 0) {
	// 	 	res.status(403).json({ error: "No ha ingresado ningun nombre!!" });
 	//  }
	// 	    if (usuario.nombre.length > 14) {
	// 		res.status(403).json({
	// 			error: "Excedió el limite maximo (14) de caracteres para el campo NOMBRE!!"});
	// 	 }
	// 	 if (usuario.nombre.length < 3) {
	// 	 	res.status(403).json({
	// 	 		error: "Nombre invalido, debe contener entre 3 y 14 caracteres!!"});
	// 	}
	// 	 if (!patternName.test(usuario.nombre)) {
	// 	 	res.status(403).json({error: "Nombre invalido, debe comenzar con mayuscula y no poseer numeros."});
	// 	 }
		
	// 	// //FUNCIONAN LAS VALIDACIONES		
	// 	// // FIN NOMBRE


	// 	 //APELLIDO
	// 	 if (usuario.apellido.length == 0) {
	// 		 res.status(403).json({error: "No ha ingresado ningun apellido!!" });
	// 	 }
	// 	 if (usuario.apellido.length > 14) {
	// 	 	res.status(403).json({error: "Excedió el limite maximo (14) de caracteres para el campo APELLIDO!!"});
	// 	}
	// 	if (usuario.apellido.length < 3) {
	// 	 	res.status(403).json({error: "Apellido invalido, debe contener entre 3 y 14 caracteres!!"});
	// 	}
	// 	if (!patternSurname.test(usuario.apellido)) {
	// 	res.status(403).json({error: "Apellido invalido, debe comenzar con mayuscula y no poseer numeros."});
	// 	}
	// 	// //FUNCIONAN LAS VALIDACIONES		
	// 	// // FIN APELLIDO


	// 	 //DNI
		if (usuario.dni.length < 1) {
			
			return res.status(403).json({message: "No ha ingresado ningun DNI!!"});
		}
		if (usuario.dni.length > 8) {
			
			return res.status(403).json({message: "Excedió el limite maximo (8) de digitos para el campo DNI!!"});
		}
		 if (usuario.dni.length < 7) {
		 	return res.status(403).json({message: "DNI invalido, debe contener entre 7 y 8 digitos!!"});
		 }
		 if (!patternDOC.test(usuario.dni)) {
			 return res.status(403).json({message: "DNI invalido, debe contener solo numeros, sin puntos ni espacios."});
		 }

	// 	// // FIN DNI


	// 	// //TELEFONO
	// if (usuario.telefono.length == 0) {
	// 	res.status(403).json({message: "No ha ingresado ningun telefono!!"});
	// 	}
	// 	if (usuario.telefono.length > 9) {
	// 	 	res.status(403).json({message: "Excedió el limite maximo (10) de digitos para el campo TELEFONO!!"});
	// 	 }
	// 	if (usuario.telefono.length < 8) {
	// 		res.status(403).json({message: "Telefono invalido, debe contener entre 8 y 10 digitos!!"});
	// 	 }
	// 	 if (!patternTel.test(usuario.telefono)) {
	// 	 	res.status(403).json({message: "Telefono invalido, debe contener solo numeros, sin guiones ni espacios."});
    //      }
		// FIN TELEFONO
        
        //res.send('Usuario agregado!!!');
        const busqueda = await userModel.findMail(usuario.email);
        // usuario.password = await userModel.encriptPass(usuario.password);
        
		
        
        if (!busqueda) {

            try{

				   const result = await userModel.create(usuario);

			
                
                    await transporter.sendMail({
                        from: '"PET CONTROL 👻" <info@petcontrolsoftware.com>',
                        to:usuario.email,
                        subject:'Registro PET CONTROL exitoso!!',
                        html:`Hola ${usuario.nombre}, gracias por ustilizar PET CONTROL SOFTWARE Gestion Veterinaria Online,
                        ya podés ingresar a nuestro sitio clickeando el siguiente enlace:
                        <a href="http://localhost:4200/auth/login"> Pet Control Software | Gestión Veterinaria </a>`
                    });
                console.log(transporter);
        

            }
            catch(err){

                console.log("error:", err);


            }
	
            return res.status(200).json({ message: 'El usuario se ha registrado con éxito!!!! Usuario: ' + usuario.nombre });

			
        }
		if(busqueda){
			return res.status(403).json({message:"El usuario ya se encuentra registrado!"});
		}
        
    

	}
   /* public home(req: Request, res: Response) {
        if (!req.session.auth) {
            // req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            // res.redirect("./error");
        }
        console.log(req.body);
        
    }*/

    public endSession(req: Request, res: Response) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }

}
    

    const authController = new AuthController();
    export default authController;

