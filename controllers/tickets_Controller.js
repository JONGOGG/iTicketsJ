const TicketModel = require('../models/model_ticket.js');
const {getRolUserAndUsername} = require('./loginOut_Controller.js');

const crear_ticket= (req,res) =>{
    const { rolUser, username } = getRolUserAndUsername();
    res.render('crear_ticket',
    {
        title:"Creación de Ticket",
        rol: rolUser,
        name: username,
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