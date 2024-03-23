const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const rutas = require('./routes/rutas');
const authMiddleware = require('./middleware/authMiddleware');
const usuarioModel = require('./models/Model_usuario.js');
const TicketModel = require('./models/model_ticket.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
/* const jwt = require('jsonwebtoken'); */
const cookieParser = require('cookie-parser');

require('dotenv').config(); // Para cargar las variables de entorno desde el archivo .env



app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join('public')));

app.use((req, res, next) => {
    /* console.log(res) */
    next();
});
app.use(rutas);

// Inicio de sesión
// Aplicar middleware de autenticación a todas las rutas
app.use(authMiddleware); 



app.post('/crear_ticket', (req, res) => {
    // Obtener los datos del formulario desde el cuerpo de la solicitud
    const { Usuario, Correo, tipo_servicio, Descripcion } = req.body;

    // Insertar un nuevo usuario en la base de datos
    const nuevoTicket = TicketModel.build({
        usuario: Usuario,
        email: Correo,
        asunto: tipo_servicio,
        descripcion: Descripcion,
    });

    // Guardar la instancia en la base de datos
    nuevoTicket.save()
        .then(ticket => {
            console.log('ticket creado correctamente:', ticket.toJSON());
            res.send('<script>window.location.href="/login";</script>');
        })
        .catch(error => {
            console.error('Error al insertar el usuario:', error);
            res.status(500).send('Error en el servidor');
        });
});

app.listen(port, () => {
    console.log(`El servidor está ejecutando en el puerto ${port}`);
});
