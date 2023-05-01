import  { app } from './app/servidor.js'
import { PORT } from './config/servidor.config.js'
import { conectar } from "./database/mongoose.js"


await conectar()

app.listen(PORT, ()=>console.log(`!Servidor arriba en el puerto ${PORT}!`))
