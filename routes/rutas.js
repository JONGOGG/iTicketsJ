const express = require('express');
const router = express.Router();
const paginas = require('../controllers/pgController.js');
//const authMiddleware = require('../middleware/authMiddleware');
const auth = require('../middleware/authMiddleware');

router.get('/login', paginas.login);
router.post('/login', paginas.loginVerificar);
router.use(auth.authMiddleware); // Aplicar middleware de autenticación a todas las rutas después de /login

router.get('/registro', auth.isAdmin, paginas.registro);
router.post('/registro', auth.isAdmin, paginas.registroAltas);

router.get('/crear_ticket', auth.isUser, paginas.crear_ticket);
router.post('/crear_ticket', auth.isUser, paginas.ticketAlt);

router.get('/logout', paginas.logout);

router.get('/usuarios', auth.isAdmin, paginas.usuarios);

router.get('/Listar_ticket', auth.isAdmin, paginas.Listar_ticket);

router.get('/listar_usTicket', auth.isUser, paginas.listar_usTicket);


module.exports = router;
