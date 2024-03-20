const Sequelize = require('sequelize');

const conexion = new Sequelize('itickets', 'root', '', {
  host: 'localhost' || "127.0.0.1",
  port: '3306',
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, 
    idle: 10000
  },
  
});

// Verificar la conexión
conexion.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = conexion;
