const express = require('express');
const { Model } = require('sequelize');
const router = express.Router();
const dashboard = require('../controllers/analitics_Controller');
const auth = require('../middleware/authMiddleware');

router.get('/estadisticas', auth.isAdmin, dashboard.grafica);

module.exports=router;