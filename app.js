const express = require("express");
const app = express();
const port = 4000;
const path =require("path");
const rutas = require('./routes/rutas')
const conexion=require('./config/conexion.js')

conexion.authenticate()
.then(()=>{
    console.log("Conexion a la base de datos exitosa")
})
.catch((err)=>{
    console.error(err);
});

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');


app.use((req,res,next)=>{
    /* console.log(res) */
    next()
}) 


app.use(rutas)


app.use(express.static(path.join('public')))

app.listen(port,() => {
    console.log(`El servidor esta ejecutando en el puerto ${port}`)
})
