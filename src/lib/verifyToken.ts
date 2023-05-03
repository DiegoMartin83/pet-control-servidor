import { Request, Response, NextFunction } from "express";
 //import jwt from "jsonwebtoken";


export const validationToken = (req: Request, res: Response, next: NextFunction) => {
    //Recuperamos la cabecera y la dividimos en 2
    let token: any = (req.header("token")?.split('Baerer ', 2));
    //tomamos la parte que nos interesa, el token, para despues evaluar.
    // token = token['1'];
    console.log("Evaluando token ingresado...");
    console.log(token);
    if (!token)
        return res.status(401).json("Acceso denegado, debes estar logueado para acceder a  la operación que estás intentando realizar!!");
    next();
} 