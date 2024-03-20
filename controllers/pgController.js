const usuarioModel=require('../models/model_usuario.js');
const login= (req,res) =>{
    res.render('login',
    {
        title:"Login",
    })
}

const registro= (req,res) =>{
    res.render('registro',
    {
        title:"Registro",
    })
}


module.exports={
    login,
    registro
}