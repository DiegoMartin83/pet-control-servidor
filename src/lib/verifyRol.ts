import { Request, Response, NextFunction } from "express"

export const CheckRol = (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            const { rol } = req.session.user;
            if (req.session.user) {
                if (rol == role) {
                    next();
                } else {
                    return res.status(401).json({ message: "No puedes ver esta sección, debes ser administrador para poder acceder aquí!" });
                }
            } else {
                return res.status(404).json({ message: "Ha ocurrido un error inesperado!" });
            }

        } catch (e) {
            return res.status(404).json({ message: 'No está autenticado!' })
        }

    }
}

