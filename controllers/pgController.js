
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

}