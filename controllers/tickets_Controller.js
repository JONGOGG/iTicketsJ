const TicketModel = require('../models/model_ticket.js');
const usuarioModel = require('../models/Model_usuario');
const {getRolUserAndUsername} = require('./loginOut_Controller.js');

const crear_ticket= async(req,res) =>{
    const { rolUser, username } = getRolUserAndUsername();
    const em = await usuarioModel.findAll({ where: { user: username } });
    res.render('crear_ticket',
    {
        title:"Creación de Ticket",
        rol: rolUser,
        name: username,
        alterar:"readonly",
        ticket:em
    })
}

const ticketAlt =async (req, res) => {
    const { rolUser, username } = getRolUserAndUsername();
    const em = await usuarioModel.findAll({ where: { user: username } });
    // Obtener los datos del formulario desde el cuerpo de la solicitud
    const { Usuario, Correo, tipo_servicio, Descripcion } = req.body;

    // Validar que no haya campos vacíos
    if (!Usuario || !Correo || !tipo_servicio || !Descripcion) {
        return res.render('crear_ticket', {
            title: "Error",
            alertMessage: "Todos los campos son obligatorios.",
            icon: "error",
            rol: rolUser,
            name: username,
            alterar:"readonly",
            ticket:em
    });
    }
    if (!Correo.endsWith('@gmail.com')) {
        return res.render('crear_ticket', {
            title: "Error",
            alertMessage: "El email debe tener la extensión @gmail.com.",
            icon: "error",
            rol: rolUser,
            name: username,
            alterar:"readonly",
            ticket:em
        });
    }
    if (tipo_servicio === "-- Seleccione un tema de Ayuda --") {
        return res.render('crear_ticket', {
            title: "Error",
            alertMessage: "Selecciona un tipo de usuario válido.",
            icon: "error",
            rol: rolUser,
            name: username,
            alterar:"readonly",
            ticket:em
        });
    }
    // Expresión regular para caracteres especiales
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Validar que no haya caracteres especiales en Usuario y Descripcion
    if (specialCharsRegex.test(Usuario) || specialCharsRegex.test(Descripcion)) {
        return res.render('crear_ticket', {
            title: "Error",
            alertMessage: "El usuario y la descripción no pueden contener caracteres especiales.",
            icon: "error",
            rol: rolUser,
            name: username,
            alterar:"readonly",
            ticket:em
    });
    }

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
            return res.render('crear_ticket', {
                title: "Ticket",
                alertMessage: "Ticket creado correctamente",
                icon: "success",
                rol: rolUser,
                name: username,
                ticket:em
            });
        })
        .catch(error => {
            console.error('Error al insertar el usuario:', error);
            res.status(500).send('Error en el servidor');
        });
}


const Listar_ticket = async (req, res) => {
    const { rolUser, username } = getRolUserAndUsername();
    const tickets = await TicketModel.findAll(); 
    res.render('Listar_ticket',
    {tickets,
    title:'Listado de Tickets',
    rol: rolUser,
    name: username

});
}

const listar_usTicket = async (req, res) => {
    const { rolUser, username } = getRolUserAndUsername();
    const user= username;
    const UStickets = await TicketModel.findAll({ where: { usuario: user } });
    res.render('listar_usTicket',
    {UStickets,
    title:'Listado de Tickets',
    rol: rolUser,
    name: username

});
}
module.exports={
    crear_ticket,
    ticketAlt,
    Listar_ticket,
    listar_usTicket
}