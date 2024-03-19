

const login= (req,res) =>{
    res.render('login',
    {
        title:"Login",
    })
}

module.exports={
    login
}