const express = require('express');
const router = express.Router();
const registro = require('../controllers/users_Controller');
const auth = require('../middleware/authMiddleware');

router.get('/registro', auth.isAdmin, registro.registro);
router.post('/registro', auth.isAdmin, registro.registroAltas);
router.get('/usuarios', auth.isAdmin, registro.usuarios);
module.exports= router;