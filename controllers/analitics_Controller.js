
const TicketModel = require('../models/model_ticket.js');
const UsuarioModel = require('../models/Model_usuario');
const {getRolUserAndUsername} = require('./loginOut_Controller.js');
const grafica = async (req,res)=>{
    const { rolUser, username } = getRolUserAndUsername();
    const fin = "Finalizado"
    const pend = "Pendiente"
    const NumTickets = await TicketModel.findAll();
    const realizados= await TicketModel.findAll({where:{status: fin}});
    const pendientes=await TicketModel.findAll({where:{status: pend}});
    let a
    let b
    let mesesP=[0,0,0,0,0,0,0,0,0,0,0,0]
    let mesesR=[0,0,0,0,0,0,0,0,0,0,0,0]

    for (let i = 0; i < pendientes.length; i++) {
       
        a = pendientes[i].fecha_expedido;
        b = a.getMonth();
        for (let index = 0; index < 11; index++) {
            if( b == index ){
                mesesP[index]++
             }
            
        }
       
    

    }
    for (let i = 0; i < realizados.length; i++) {
       
        a = realizados[i].fecha_cierre;
        b = a.getMonth();
        for (let index = 0; index < 11; index++) {
            if( b == index ){
                mesesR[index]++
             }
            
        }
       
  

    }
      
    

    const NumUsers = await UsuarioModel.findAll(); 
    res.render('estadisticas',
    {
    title:'Estadisticas',
    rol: rolUser,
    name: username,
    numPendientes: realizados.length,
    numFinalizados: pendientes.length,
    numUsers: NumUsers.length,
    numTickets: NumTickets.length,
    mesesP: mesesP,
    mesesR: mesesR

});

}

module.exports={
    grafica
}