const bcrypt = require('bcrypt');
const usuarioModel = require('../models/Model_usuario');
const {getRolUserAndUsername} = require('./loginOut_Controller.js');
const saltRounds = 10;
const { Op } = require('sequelize');

/* Altas de usuario */
const registroAltas = (req, res) => {
    const { rolUser, username } = getRolUserAndUsername();
    
    // Obtener los datos del formulario desde el cuerpo de la solicitud
    const { Nombre, Apellido, Correo, telefono, tipo_usuario, user, pass } = req.body;

    bcrypt.hash(pass, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error al cifrar la contraseña:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (tipo_usuario === "-- Seleccione una de las opciones --") {
            return res.render('registro', {
                title: "Error",
                alertMessage: "Selecciona un tipo de usuario válido",
                icon: "error",
                rol: rolUser,
                name: username
            });
        }

        if (!Correo.endsWith('@gmail.com')) {
            return res.render('registro', {
                title: "Error",
                alertMessage: "El email debe tener la extensión @gmail.com.",
                icon: "error",
                rol: rolUser,
                name: username
            });
        }

        if (user.length > 15 || pass.length > 15 || telefono.length > 15) {
            return res.render('registro', {
                title: "Error",
                alertMessage: "El usuario y la contraseña no pueden superar los 15 caracteres",
                icon: "error",
                rol: rolUser,
                name: username
            });
        }
        
        const regex = /^[a-zA-Z0-9\s]*$/;
        if (!regex.test(Nombre) || !regex.test(Apellido) || !regex.test(user) || !regex.test(pass)) {
            return res.render('registro', {
                title: "Error",
                alertMessage: "El nombre de usuario y la contraseña no pueden contener caracteres especiales",
                icon: "error",
                rol: rolUser,
                name: username
            });
        }

        // Verificar si el usuario ya existe en la base de datos por su nombre de usuario
        usuarioModel.findOne({
            where: {
                user: user
            }
        }).then(existingUser => {
            if (existingUser) {
                // Si el usuario ya existe, mostrar un mensaje de error
                return res.render('registro', {
                    title: "Error",
                    alertMessage: "El nombre de usuario ya está registrado.",
                    icon: "error",
                    rol: rolUser,
                    name: username
                });
            } else {
                // Si el usuario no existe, proceder con la inserción en la base de datos
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
                        return res.render('registro', {
                            title: "Registrado",
                            alertMessage: "Usuario insertado correctamente",
                            icon: "success",
                            rol: rolUser,
                            name: username
                        });
                    })
                    .catch(error => {
                        console.error('Error al insertar el usuario:', error);
                        res.status(500).send('Error en el servidor');
                    });
            }
        }).catch(error => {
            console.error('Error al buscar usuario en la base de datos:', error);
            res.status(500).send('Error en el servidor');
        });
    }); 
};


const registro= (req,res) =>{
const { rolUser, username } = getRolUserAndUsername();
    res.render('registro',
    { 
        title:"Registro",
        rol: rolUser,
        name: username 

    })
}

const usuarios = async (req, res) => {
    const { rolUser, username } = getRolUserAndUsername();
    const usuarios = await usuarioModel.findAll(); 

    res.render('usuarios',
    {usuarios,
    title:'Listado de Usuarios',
    rol: rolUser,
    name: username

});
}

const eliminar = async (req, res) => {
    const { rolUser, username } = getRolUserAndUsername();
    const req_id=req.params.id;
    usuarioModel.destroy({
    where:{
        id:req_id
    }
   });

}
const edit= async(req,res) =>{
    const { rolUser, username } = getRolUserAndUsername();
    const req_id=req.params.id;
    const usuarios = await usuarioModel.findAll({
        where:{
            id:req_id
        }
    }); 

        res.render('updateUser',
        { 
            title:"Actualizar Usuarios",
            rol: rolUser,
            name: username,
            usuarios: usuarios,

    
        })
    }

    const update = async (req, res) => {
        try {
            const { id, nombre, apellidos, email, telefono } = req.body;
    
            // Verificar si el usuario tiene permisos adecuados para realizar la actualización
            // Esto puede incluir alguna lógica de autenticación y autorización
    
            // Realizar la actualización en la base de datos
            await usuarioModel.update(
                // Los datos que se van a actualizar
                { nombre, apellidos, email, telefono }, 
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
    registro,
    registroAltas,
    usuarios,
    eliminar,
    edit,
    update
}