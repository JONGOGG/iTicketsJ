
const login= (req,res) =>{
    res.render('login',
    {
        title:"Login",
    })
}

const registro= (req,res) =>{
    res.render('registro',
    {
        title:"Rgistro",
    })
}

module.exports={
    login,
    registro
}