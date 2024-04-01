const express = require('express');
const router = express.Router();
const tickets = require('../controllers/tickets_Controller');
const auth = require('../middleware/authMiddleware');
 
router.get('/crear_ticket', auth.isUser, tickets.crear_ticket);
router.post('/crear_ticket', auth.isUser, tickets.ticketAlt);
router.get('/Listar_ticket', auth.isAdmin, tickets.Listar_ticket);
router.get('/listar_usTicket', auth.isUser, tickets.listar_usTicket);

module.exports = router;