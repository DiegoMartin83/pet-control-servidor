// import { Request, Response, NextFunction } from "express"

// export const checkSpeciality = (speciality: string) => {
//     return async (req: Request, res: Response, next: NextFunction) => {

//         try {
//             const { tipo } = req.session.veterinario;
//             if (req.session.veterinario) {
//                 if (tipo == speciality) {
//                     next();
//                 } else if (req.session.administrativo) {
//                     return res.status(401).json({ message: "Sección exclusiva de veterinarios!" });
//                 }
//             } else {
//                 return res.status(404).json({ message: "Ha ocurrido un error inesperado!" });
//             }

//         } catch (e) {
//             return res.status(404).json({ message: 'No está autenticado!' })
//         }

//     }
// }