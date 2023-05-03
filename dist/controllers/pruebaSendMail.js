"use strict";
// // #######################INICIO_MAIL###############################################
// 	// Activar el envios desde una APP primero:
// 	// https://myaccount.google.com/lesssecureapps
// 	public async formulario(req: Request, res: Response) {
// 		console.log('ACA ENTRO EN EL CONTROL DE SEND MAIL:');
// 		console.log(req.body);
// 		let formulario = req.body;
// 		console.log(formulario);
// 		console.log('Entre al module.exports!');
// 		var transporter = nodemailer.createTransport({
// 			service: 'gmail',
// 			auth: {
// 				user: 'libretadigital.ifts11@gmail.com', // Cambialo por tu email
// 				pass: 'xxxxxx' // Cambialo por tu password
// 			}
// 		});
// 		let mailOptions = {
// 			from: "libretadigital Test",
// 			to: formulario.email,
// 			subject: formulario.asunto,
// 			html: formulario.mensaje
// 		};
// 		const user = "mezcurra";
// 		mailOptions.html = "http://localhost:4200/usuario/activado/"+user;
// 		transporter.sendMail(mailOptions, function (err, info) {
// 			if (err)
// 				console.log(err)
// 			else
// 				console.log(info);
// 		});
// 	}
// 	// matialeezcurra@gmail.com
// 	public async activate(req: Request, res: Response) {
// 		console.log()
// 		console.log(req.params);
// 		const {idUser} = req.params;
// 		const result = await userModel.buscarNombre(idUser);
// 		console.log(result);
// 		if(result){
// 			console.log('Entre al if de activar');
// 			if(result.estado == "0"){
// 				const result2 = await userModel.activarUsuario(idUser);
// 				console.log(result2);
// 				var transporter = nodemailer.createTransport({
// 					service: 'gmail',
// 					auth: {
// 						user: 'libretadigital.ifts11@gmail.com', // Cambialo por tu email
// 						pass: 'xxxxxxxxx' // Cambialo por tu password
// 					}
// 				});
// 				let mailOptions = {
// 					from: "libretadigital.ifts11@gmail.com",
// 					to: result.mail,
// 					subject: "Activacion de usuario en Libreta Digital",
// 					html: "Se activo correctamente su usuario. El link para su ingreso es: https://ppiii-demo1.herokuapp.com"
// 				}
// 				console.log(mailOptions);
// 				transporter.sendMail(mailOptions, function (err, info) {
// 				if (err)
// 					console.log(err)		
// 				 else
// 					console.log(info);
// 				});
// 				// ACA MANDAMOS UN MAIL DE CONFIRMICION OK
// 				return res.status(200).json({ message: "El usuario se activo correctamente, se le envio un mail a su correo",usuario:result2.usuario });
// 			}
// 			else{
// 			return res.status(404).json({ message: "Este link ya no funciona." });
// 			}
// 		}
// 		else{
// 			return res.status(404).json();
// 		}
// 	}
// 	// #######################FIN_MAIL##################################################
//# sourceMappingURL=pruebaSendMail.js.map