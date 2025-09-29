export const authAdmin = (req, res, next) => {
    try {
        const decoded = req.userLogged;
        if (decoded.role !== "admin") {
            return res.status(403).json("No se tienen los permisos de administrador");
        }
        next();
    } catch (error) {
        return res.status(500).json("Error al comprobar roles " + error);
    }
};