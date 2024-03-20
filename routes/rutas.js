const express = require('express')
const router = express.Router();
const paginas = require('../controllers/pgController.js');

router.get('/login', paginas.login)
<<<<<<< HEAD
router.get('/consultas', paginas.consultas)
=======
router.get('/registro', paginas.registro)
router.get('/crear_ticket', paginas.crear_ticket)


>>>>>>> b396c546c9deed74668d9cb171fd1acddbc9e57b
module.exports = router;
