const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        // Extraer el tipo de usuario del token decodificado y asignarlo a req.tipo_usuario
        req.tipo_usuario = decoded.tipo_usuario;

        // Si todo está bien, permitir acceso a la ruta
        next();
    });
};

module.exports = authMiddleware;
