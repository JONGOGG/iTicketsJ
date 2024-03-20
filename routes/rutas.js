const express = require('express')
const router = express.Router();
const paginas = require('../controllers/pgController.js');

router.get('/login', paginas.login)
router.get('/registro', paginas.registro)
router.get('/crear_ticket', paginas.crear_ticket)


module.exports = router;
