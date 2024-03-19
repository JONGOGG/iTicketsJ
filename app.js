const express = require("express");
const app = express();
const port = 4000;
const path =require("path");
const rutas = require('./routes/rutas')

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
