
const login= (req,res) =>{
    res.render('login',
    {
        title:"Login",
    })
}

<<<<<<< HEAD
const consultas = (req,res) =>{
    res.render('consultas',
    {
        title:"Consultas",
    })
}

module.exports={
    login,
    consultas
=======
const registro= (req,res) =>{
    res.render('registro',
    {
        title:"Registro",
    })
}

const crear_ticket= (req,res) =>{
    res.render('crear_ticket',
    {
        title:"Creación de Ticket",
    })
}


module.exports={
    login,
    registro,
    crear_ticket
>>>>>>> b396c546c9deed74668d9cb171fd1acddbc9e57b
}