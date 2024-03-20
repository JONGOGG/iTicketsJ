

const login= (req,res) =>{
    res.render('login',
    {
        title:"Login",
    })
}

const consultas = (req,res) =>{
    res.render('consultas',
    {
        title:"Consultas",
    })
}

module.exports={
    login,
    consultas
}