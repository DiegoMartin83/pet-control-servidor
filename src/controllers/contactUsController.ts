import {Request, Response } from 'express';
import {transporter} from '../config/mailer'
import contactUsModel from '../models/contactUsModel';




class ContactUsController {


    public async createContact(req:Request,res:Response){
		
        const usuario = req.body;
        
        // const contacto = {  
        //     "nombreyapellido": req.body.nombreyapellido,
        //     "email": req.body.email,
        //     "telefono": req.body.telefono,
        //     "consulta": req.body.consulta
           
        // };
        const contacto = {  
            "nombreyapellido": req.body.nombreyapellido,
            "email": req.body.email,
            "consulta": req.body.consulta,
            "telefono": req.body.telefono
           
        };
		
        const result = await contactUsModel.crearConsulta(contacto);
        console.log(result);

		if (!result)
			return res.status(404).json({ message: "Algo salió mal :/" });
        else {

            res.status(200).json({message: "Consulta enviada con éxito!!!"})
                   
                    try{
    
            
                                await transporter.sendMail({
                                from: `${usuario.email}`,
                                to:' <info@petcontrolsoftware.com>',
                                subject:`Nueva consulta ingresada del usuario  ${usuario.nombre} ${usuario.apellido}` ,
                                html: `${usuario.consulta}`});
            
                                //Vemos el estado del correo
                                console.log(transporter);
    
    
                } catch(err){
    
                    console.log("error:", err);
                    
                    }
                   
    
}
            }     
            
            public async listContacts(req:Request, res:Response){
             
                
                const result = await contactUsModel.listarConsultas();
                res.render("partials/formTurnos", {result});
                // return res.json(result)

            }


            public async eliminarConsulta(req:Request, res: Response){

                const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
                const result = await contactUsModel.deleteQuery(id);
                
                return res.status(200).json({message: 'La consulta ha sido removida de la base de datos!'})
            }


        }



const contactUsController = new  ContactUsController();
export default contactUsController;