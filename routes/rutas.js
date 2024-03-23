const express = require('express');
const router = express.Router();
const paginas = require('../controllers/pgController.js');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/login', paginas.login);

router.use(authMiddleware); // Aplicar middleware de autenticación a todas las rutas después de /login

router.get('/registro', (req, res, next) => {
    // Verificar si el tipo de usuario es 'admin'
    if (req.tipo_usuario !== 'Admin') {
        return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
    }
    // Si el tipo de usuario es 'admin', permitir acceso a la ruta
    next();
}, paginas.registro);

router.get('/crear_ticket', (req, res, next) => {
    // Verificar si el tipo de usuario es 'user'
    if (req.tipo_usuario !== 'User') {
        return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
    }
    // Si el tipo de usuario es 'user', permitir acceso a la ruta
    next();
}, paginas.crear_ticket);

module.exports = router;
