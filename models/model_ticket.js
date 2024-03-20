const Sequelize = require('sequelize');
const conexion = require('../config/conexion.js');

const TicketModel = conexion.define("tickets", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    asunto: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Pendiente" 
    },
    fecha_expedido: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW 
    },
    fecha_cierre: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null 
    }
});

module.exports = TicketModel;
