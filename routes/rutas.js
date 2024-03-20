const express = require('express')
const router = express.Router();
const paginas = require('../controllers/pgController.js');
router.get('/login', paginas.login)
router.get('/consultas', paginas.consultas)
module.exports = router;
