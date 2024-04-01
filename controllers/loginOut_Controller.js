const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/Model_usuario');

const Swal = require('sweetalert2');
let rolUser="";
let username="";

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
                    icon: "error"
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

const logout= (req,res) =>{
   
    res.cookie('token', null, {
      expiresIn: new Date(0)
    });
    res.redirect('/login');
}
const getRolUserAndUsername = () => {
    return { rolUser, username };
};

module.exports={
    login,
    loginVerificar,
    logout,
    getRolUserAndUsername
}

