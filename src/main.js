import mongoose from 'mongoose'
import  { app } from './app/servidor.js'
import { MONGODB_CNX_STR } from './config/database.config.js'
import { PORT } from './config/servidor.config.js'



await mongoose.connect(MONGODB_CNX_STR)
console.log(`base de datos conectada a ${MONGODB_CNX_STR}`)

app.listen(PORT, ()=>console.log(`!Servidor arriba en el puerto ${PORT}!`))