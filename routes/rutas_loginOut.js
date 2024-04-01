const express = require('express');
const router = express.Router();
const onOut = require('../controllers/loginOut_Controller');
const auth = require('../middleware/authMiddleware');

router.get('/login', onOut.login);
router.post('/login', onOut.loginVerificar);
router.use(auth.authMiddleware); // Aplicar middleware de autenticación a todas las rutas después de /login
router.get('/logout', onOut.logout);

module.exports = router;