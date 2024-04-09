const TicketModel = require('../models/model_ticket.js');
const usuarioModel = require('../models/Model_usuario');
const Sequelize = require('sequelize');
const {getRolUserAndUsername} = require('./loginOut_Controller.js');
const transporter = require('../config/mailer.js');


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
const Listar_Tecticket = async (req, res) => {
    const { rolUser, username } = getRolUserAndUsername();
    const user= username;
    const TECtickets = await TicketModel.findAll({ where: { tecnico: user } });
    res.render('Listar_Tecticket',
    {TECtickets,
    title:'Listado de Tickets',
    rol: rolUser,
    name: username

});
}
const asignar = async (req, res) => {
    try {
        const { rolUser, username } = getRolUserAndUsername();
        const req_id = req.params.id;
        const usuarios = await usuarioModel.findAll({
            where: {
                tipo_usuario: "Tecnico"
            }
        });
        const asig = await TicketModel.findAll({
            where: {
                id: req_id
            }
        });

        res.render('asignar',
            {
                title: "Asignar Tecnico",
                rol: rolUser,
                name: username,
                usuarios: usuarios,
                asig: asig

            });
    } catch (error) {
        console.error('Error al cargar la página de asignación de técnico:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const asignado = async (req, res) => {
    try {
        const { id, tecnico } = req.body;

        // Realizar la actualización en la base de datos
        await TicketModel.update(
            { tecnico },
            { where: { id: id } }
        );

        // Buscar la información del técnico asignado en la base de datos
        const tecnicoInfo = await usuarioModel.findOne({ where: { user: tecnico } });

        // Verificar si se encontró la información del técnico
        if (tecnicoInfo) {
            // Obtener la dirección de correo electrónico del técnico
            const correoTecnico = tecnicoInfo.email;

            // Construir el cuerpo del correo electrónico
            const ticketInfo = await TicketModel.findOne({ where: { id: id } });
            const mailBody = `
            <h2>Te informamos que se ha generado un nuevo ticket en nuestro sistema</h2>
                <p>A continuación, te proporciono los detalles pertinentes:</p>
                <ul>
                    <li><strong>Número de Ticket:</strong> ${ticketInfo.id}</li>
                    <li><strong>Fecha de Creación:</strong> ${ticketInfo.fecha_expedido}</li>
                    <li><strong>Cliente:</strong> ${ticketInfo.usuario}</li>
                    <li><strong>Área:</strong> ${ticketInfo.asunto}</li>
                    <li><strong>Descripción Breve del Problema:</strong> ${ticketInfo.descripcion}</li>
                </ul>
                <p>Te solicito que revises este ticket y tomes las medidas necesarias para abordarlo de manera oportuna y eficiente.</p>
                <p>Gracias por tu atención y pronta acción.</p>
                <p>Saludos cordiales</p>
            `;

            // aqui se detalla el contenido del correo electronico


            let mailOptions = {
                from: 'aztetics.ti@gmail.com',
                to: correoTecnico,
                subject: 'Nuevo asignado ticket',
                html: mailBody
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).send('Error al enviar el correo electrónico');
                } else {
                    console.log('Correo electrónico enviado: ' + info.response);
                    res.send('¡Correo electrónico enviado con éxito!');
                }
            });
        } else {
            res.status(404).send('Técnico no encontrado');
        }
    } catch (error) {
        console.error('Error al asignar técnico:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


    const finalizar = async (req, res) => {
        const { rolUser, username } = getRolUserAndUsername();
        const req_id=req.params.id;
        const asig = await TicketModel.findAll({
            where:{
                id:req_id
            }
        });
    
            res.render('finalizar',
            { 
                title:"Finalizar Ticket",
                rol: rolUser,
                name: username,
                asig:asig
    
            })
    };


    const finalizado = async (req, res) => {
        try {
            const { id, status } = req.body;
    
            // Verificar si el usuario tiene permisos adecuados para realizar la actualización
            // Esto puede incluir alguna lógica de autenticación y autorización
    
            // Realizar la actualización en la base de datos
            await TicketModel.update(
                // Los datos que se van a actualizar
                { status,
                    fecha_cierre: Sequelize.literal('CURRENT_TIMESTAMP')
                }, 
                // Opciones de búsqueda
                { 
                    where: { id: id } // Aquí se especifica qué registro debe ser actualizado
                }
            );
    
            
    
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

module.exports={
    crear_ticket,
    ticketAlt,
    Listar_ticket,
    listar_usTicket,
    Listar_Tecticket,
    asignar,
    asignado,
    finalizar,
    finalizado
}