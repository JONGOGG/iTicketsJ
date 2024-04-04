const express = require('express');
const router = express.Router();
const onOut = require('../controllers/loginOut_Controller');
const auth = require('../middleware/authMiddleware');

router.get('/login',auth.logoutcok, onOut.login );
router.post('/login', onOut.loginVerificar);
router.get('/logout', onOut.logout);
router.use(auth.authMiddleware); // Aplicar middleware de autenticación a todas las rutas después de /login
module.exports = router;