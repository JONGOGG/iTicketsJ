const sequelize= require('sequelize');
const conexion = require('../config/conexion.js');

const usuarioModel = conexion.define("usuarios", {
    nombre:{
        type :sequelize.STRING,
        allowNull: false
    },
    email:{
        type :sequelize.STRING,
        allowNull: false,
        unique: true
    },
    telefono:{
        type :sequelize.STRING,
        allowNull: false,
    },
    tipo_usuario:{
        type :sequelize.STRING,
        allowNull: false,
    },
    user:{
        type :sequelize.STRING,
        allowNull: false,
        unique: true
    },
    pass:{
        type :sequelize.STRING,
        allowNull: false,
        unique: true
    },
 
})

module.exports=usuarioModel;