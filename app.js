const express = require("express");
const app = express();
const port = 4000;
const path =require("path");
const rutas = require('./routes/rutas')
const usuarioModel=require('./models/model_usuario.js');
const TicketModel=require('./models/model_ticket.js');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');
app.use(express.static(path.join('public')))

app.use((req,res,next)=>{
    /* console.log(res) */
    next()
}) 
app.use(rutas)

app.post('/registro', (req, res) => {
    // Obtener los datos del formulario desde el cuerpo de la solicitud
    const { Nombre,Apellido, Correo, telefono, tipo_usuario, user, pass } = req.body;

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
    pass: pass,
    // No necesitas incluir la fecha_registro ya que está configurada para establecerse automáticamente
  });
  
  // Guardar la instancia en la base de datos
  nuevoUsuario.save()
          .then(usuario => {
              console.log('Usuario insertado correctamente:', usuario.toJSON());
              res.send('<script>window.location.href="/login";</script>');
          })
          .catch(error => {
              console.error('Error al insertar el usuario:', error);
              res.status(500).send('Error en el servidor'); // Enviar mensaje de error al cliente
          });
  });

  app.post('/crear_ticket', (req, res) => {
    // Obtener los datos del formulario desde el cuerpo de la solicitud
    const { Usuario, Correo, Asunto, Descripcion, status } = req.body;

  // Insertar un nuevo usuario en la base de datos
  const nuevoTicket = TicketModel.build({
    usuario: Usuario,
    email: Correo,
    asunto: Asunto,
    descripcion: Descripcion,
    status: status
    // No necesitas incluir la fecha_registro ya que está configurada para establecerse automáticamente
  });
  
  // Guardar la instancia en la base de datos
  nuevoTicket.save()
          .then(ticket => {
              console.log('ticked creado correctamente:', ticket.toJSON());
              res.send('<script>window.location.href="/login";</script>');
          })
          .catch(error => {
              console.error('Error al insertar el usuario:', error);
              res.status(500).send('Error en el servidor'); // Enviar mensaje de error al cliente
          });
  });

app.listen(port,() => {
    console.log(`El servidor esta ejecutando en el puerto ${port}`)
})
