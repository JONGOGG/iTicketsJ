const express = require('express');
const router = express.Router();
const loginRutas = require('./rutas_loginOut');
const registroRutas = require('./rutas_users');
const ticketsRutas = require('./rutas_tickets');
const analiticsRutas = require('./rutas_analitics');



router.use(loginRutas);
router.use(registroRutas);
router.use(ticketsRutas);
router.use(analiticsRutas);
module.exports = router

 
/* router.get('/login', onOut.login);
router.post('/login', onOut.loginVerificar);
router.use(auth.authMiddleware); // Aplicar middleware de autenticación a todas las rutas después de /login

router.get('/registro', auth.isAdmin, paginas.registro);
router.post('/registro', auth.isAdmin, paginas.registroAltas);

router.get('/crear_ticket', auth.isUser, paginas.crear_ticket);
router.post('/crear_ticket', auth.isUser, paginas.ticketAlt);

 router.get('/logout', onOut.logout); 
router.get('/usuarios', auth.isAdmin, paginas.usuarios);

router.get('/Listar_ticket', auth.isAdmin, paginas.Listar_ticket);

router.get('/listar_usTicket', auth.isUser, paginas.listar_usTicket);


module.exports = router;
 */