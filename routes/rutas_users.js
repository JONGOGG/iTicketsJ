const express = require('express');
const router = express.Router();
const registro = require('../controllers/users_Controller');
const auth = require('../middleware/authMiddleware');

router.get('/registro', auth.isAdmin, registro.registro);
router.post('/registro', auth.isAdmin, registro.registroAltas);
router.get('/usuarios', auth.isTecnico, registro.usuarios);
router.get('/delete/:id', auth.isAdmin, registro.eliminar);
router.get('/editar/:id', auth.isAdmin, registro.edit);
router.post('/editar', auth.isAdmin, registro.update);


module.exports= router;