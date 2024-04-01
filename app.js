const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const rutas = require('./routes/rutas');

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
/* app.use(loginRutas);
app.use(registroRutas);
app.use(ticketsRutas); */




// Inicio de sesión
// Aplicar middleware de autenticación a todas las rutas
//app.use(authMiddleware); 


app.listen(port, () => {
    console.log(`El servidor está ejecutando en el puerto ${port}`);
});
