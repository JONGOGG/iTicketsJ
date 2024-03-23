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
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config(); // Para cargar las variables de entorno desde el archivo .env

const saltRounds = 10;

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
app.post('/login', (req, res) => {
    const { user, pass } = req.body;

    usuarioModel.findOne({ where: { user: user } })
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            bcrypt.compare(pass, usuario.pass, (err, result) => {
                if (err) {
                    console.error('Error al comparar contraseñas:', err);
                    return res.status(500).json({ message: 'Error en el servidor' });
                }

                if (!result) {
                    return res.status(401).json({ message: 'Credenciales inválidas' });
                }

                const token = jwt.sign({ tipo_usuario: usuario.tipo_usuario }, process.env.JWT_SECRET, {
                    expiresIn: '20d'
                });

                res.cookie('token', token, { httpOnly: true, maxAge: 20 * 24 * 60 * 60 * 1000 });

                // Redirigir al usuario según su tipo de usuario
                if (usuario.tipo_usuario === 'Admin') {
                    return res.redirect('/registro');
                } else if (usuario.tipo_usuario === 'User') {
                    return res.redirect('/crear_ticket');
                } else {
                    return res.status(403).json({ message: 'Tipo de usuario no válido' });
                }
            });
        })
        .catch(error => {
            console.error('Error al buscar el usuario:', error);
            res.status(500).send('Error en el servidor');
        });
});

// Aplicar middleware de autenticación a todas las rutas
app.use(authMiddleware);


app.post('/registro', (req, res) => {
    // Obtener los datos del formulario desde el cuerpo de la solicitud
    const { Nombre, Apellido, Correo, telefono, tipo_usuario, user, pass } = req.body;

    bcrypt.hash(pass, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error al cifrar la contraseña:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (tipo_usuario === "-- Seleccione una de las opciones --") {
            res.send('<script>alert("Seleccione un tipo de usuario válido."); window.location.href="/registro";</script>');
            return;
        }
        if (user.length > 15 || pass.length > 15 || telefono.length > 15) {
            res.send('<script>alert("El usuario y la contraseña no pueden superar los 15 caracteres."); window.location.href="/registro";</script>');
            return;
        }
        const regex = /^[a-zA-Z0-9\s]*$/;
        if (!regex.test(Nombre) || !regex.test(Apellido) || !regex.test(user) || !regex.test(pass)) {
            res.send('<script>alert("El nombre de usuario y la contraseña no pueden contener caracteres especiales."); window.location.href="/registro";</script>');
            return;
        }

        // Insertar un nuevo usuario en la base de datos
        const nuevoUsuario = usuarioModel.build({
            nombre: Nombre,
            apellidos: Apellido,
            email: Correo,
            telefono: telefono,
            tipo_usuario: tipo_usuario,
            user: user,
            pass: hash,
        });

        // Guardar la instancia en la base de datos
        nuevoUsuario.save()
            .then(usuario => {
                console.log('Usuario insertado correctamente:', usuario.toJSON());
                res.send('<script>window.location.href="/login";</script>');
            })
            .catch(error => {
                console.error('Error al insertar el usuario:', error);
                res.status(500).send('Error en el servidor');
            });
    });
});

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
