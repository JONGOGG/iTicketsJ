const jwt = require('jsonwebtoken');

const logoutcok = (req, res, next) => {
    const token = req.cookies.token;

 
        if (token) {
            return res.render('login', {
                title: "Advertencia",
                alertMessage: "Ya tiene una sesion abierta",
                icon: "warning",
            });
        }
        next();
    };


const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.render('login', {
            title: "Advertencia",
            alertMessage: "No hay una sesión iniciada",
            icon: "warning",
            ruta: "login"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.render('login', {
                title: "Advertencia",
                alertMessage: "No tienes permisos para entrar a esta ruta",
                icon: "warning",
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
                title: "Advertencia",
                alertMessage: "No tienes permisos para entrar a esta ruta",
                icon: "warning",
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
    if (req.tipo_usuario !== 'User' && req.tipo_usuario !== 'Admin' && req.tipo_usuario !== 'Tecnico') {
        return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
    }
    next();
};



module.exports = {authMiddleware, isAdmin, isTecnico, isUser, logoutcok}
