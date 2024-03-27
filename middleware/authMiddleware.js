const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.render('login', {
                title: "Login",
                alertMessage: "No tienes permisos para entrar a esta ruta",
                icon: "error",
                ruta: "login"
            });
        }

        // Extraer el tipo de usuario del token decodificado y asignarlo a req.tipo_usuario
        req.tipo_usuario = decoded.tipo_usuario;

        // Si todo está bien, permitir acceso a la ruta
        next();
    });
};
const isAdmin = (req, res, next) => {
    if (req.tipo_usuario !== 'Admin') {
          return res.render('login', {
                title: "Login",
                alertMessage: "No tienes permisos para entrar a esta ruta",
                icon: "error",
            });
    }
    next();
};

const isTecnico = (req, res, next) => {
    if (req.tipo_usuario !== 'Tecnico' && req.tipo_usuario !== 'Admin') {
        return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
    }
    next();
};

const isUser = (req, res, next) => {
    if (req.tipo_usuario !== 'User' && req.tipo_usuario !== 'Admin') {
        return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
    }
    next();
};



module.exports = {authMiddleware, isAdmin, isTecnico, isUser}
