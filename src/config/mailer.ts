import nodemailer = require('nodemailer');


    export const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "43452008b72e05",
          pass: "3329e1be05eecd"
        }
      });



      
      // export const transporter = nodemailer.createTransport({
      //   host: "petcontrolsoft@gmail.com",
      //   port: 2525,
      //   auth: {
      //     user: "Pet Control Software",
      //     pass: "7zp4xVg4"
      //   }
      // });

      
































// const sendMail = async()=> {
//     const transport = nodemailer.createTransport()
//     const info = await transport.sendMail({
//         from:'',
//         to:'',
//         subject:'Registro exitoso de PET CONTROL!!',
//         html:''
//     });
// }

// exports.sendMail = ()=>sendMail()


