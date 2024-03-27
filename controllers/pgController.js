const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/Model_usuario');
const TicketModel = require('../models/model_ticket.js');
var rolUser="";
var username="";
const saltRounds = 10;
const Swal = require('sweetalert2');



const login= (req,res) =>{
    res.render('login',
    {
        title:"Login",
    })
}
// Inicio de sesión
const loginVerificar = (req, res) => {
    const { user, pass } = req.body;

    usuarioModel.findOne({ where: { user: user } })
        .then(usuario => {
            if (!usuario) {
                return res.render('login', {
                    title: "Login",
                    alertMessage: "Usuario no encontrado",
                    icon: "error",
                });
            }

            bcrypt.compare(pass, usuario.pass, (err, result) => {
                if (err) {
                    console.error('Error al comparar contraseñas:', err);
                    return res.status(500).json({ message: 'Error en el servidor' });
                }

                if (!result) {
                    return res.render('login', {
                        title: "Login",
                        alertMessage: "Contraseña incorrecta",
                        icon: "error",
                    });
                }
                    
                const token = jwt.sign({ tipo_usuario: usuario.tipo_usuario }, process.env.JWT_SECRET, {
                    expiresIn: '20d'
                });

                res.cookie('token', token, { httpOnly: true, maxAge: 20 * 24 * 60 * 60 * 1000 });
               
                    rolUser=usuario.tipo_usuario;
                    username=usuario.user;
                // Redirigir al usuario según su tipo de usuario
                if (usuario.tipo_usuario === 'Admin') {
                    return res.redirect('/registro');

                } else if (usuario.tipo_usuario === 'User') {
                    return res.redirect('/crear_ticket');
                } 
                else if (usuario.tipo_usuario === 'Tecnico') {
                    return res.redirect('/crear_ticket');
                } 
                
                else {
                    return res.status(403).json({ message: 'Tipo de usuario no válido' });
                }
            });
        })
        .catch(error => {
            console.error('Error al buscar el usuario:', error);
            res.status(500).send('Error en el servidor');
        });  
      
};

/* Altas de usuario */
const registroAltas = (req, res) => {
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
};
const registro= (req,res) =>{
const rol = rolUser;
const name = username;

    res.render('registro',
    {
        title:"Registro",
        rol,
        name

    })
}

const crear_ticket= (req,res) =>{
    const rol = rolUser;
    const name = username;
    res.render('crear_ticket',
    {
        title:"Creación de Ticket",
        rol,
        name,
        alterar:"readonly"

    })
}

const ticketAlt= (req,res) =>{
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
}

const logout= (req,res) =>{
   
    res.cookie('token', null, {
      expiresIn: new Date(0)
    });
    res.redirect('/login');
}



const usuarios = async (req, res) => {
    const rol = rolUser;
    const name = username;
    const usuarios = await usuarioModel.findAll(); //Esto es lo que andas buscando pinche perro impio
    res.render('usuarios',
    {usuarios,
    title:'Listado de Usuarios',
    rol,
    name

});
}


const Listar_ticket = async (req, res) => {
    const rol = rolUser;
    const name = username;
    const tickets = await TicketModel.findAll(); 
    res.render('Listar_ticket',
    {tickets,
    title:'Listado de Tickets',
    rol,
    name

});
}

const listar_usTicket = async (req, res) => {
    const rol = rolUser;
    const name = username;
    const UStickets = await TicketModel.findAll({ where: { usuario: name } });
    res.render('listar_usTicket',
    {UStickets,
    title:'Listado de Tickets',
    rol,
    name

});
}


module.exports={
    login,
    loginVerificar,
    registro,
    registroAltas,
    crear_ticket,
    ticketAlt,
    logout,
    usuarios,
    Listar_ticket,
    listar_usTicket
}