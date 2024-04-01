const bcrypt = require('bcrypt');
const usuarioModel = require('../models/Model_usuario');
const {getRolUserAndUsername} = require('./loginOut_Controller.js');
const saltRounds = 10;

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
    const usuarios = await usuarioModel.findAll(); //Esto es lo que andas buscando pinche perro impio
    res.render('usuarios',
    {usuarios,
    title:'Listado de Usuarios',
    rol: rolUser,
    name: username

});
}

module.exports={
    registro,
    registroAltas,
    usuarios 
}