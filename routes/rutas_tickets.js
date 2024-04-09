const express = require('express');
const router = express.Router();
const tickets = require('../controllers/tickets_Controller');
const auth = require('../middleware/authMiddleware');
 
router.get('/crear_ticket', auth.isUser, tickets.crear_ticket);
router.post('/crear_ticket', auth.isUser, tickets.ticketAlt);
router.get('/Listar_ticket', auth.isAdmin, tickets.Listar_ticket);
router.get('/Listar_Tecticket', auth.isTecnico, tickets.Listar_Tecticket);
router.get('/listar_usTicket', auth.isUser, tickets.listar_usTicket);
router.get('/asignar/:id', auth.isAdmin, tickets.asignar);
router.post('/asignar', auth.isAdmin, tickets.asignado);
router.get('/finalizar/:id', auth.isTecnico, tickets.finalizar);
router.post('/finalizar', auth.isTecnico, tickets.finalizado);

module.exports = router;