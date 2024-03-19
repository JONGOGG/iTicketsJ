const express = require('express')
const router = express.Router();
const paginas = require('../controllers/pgController.js');
router.get('/login', paginas.login)

module.exports = router;
