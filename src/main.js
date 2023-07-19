import 'dotenv/config'
import './app/servidor.js'
import mongoose from 'mongoose'
import  { app } from './app/servidor.js'
import { MONGODB_CNX_STR } from './config/database.config.js'
import { PORT } from './config/servidor.config.js'
import { winstonLogger } from './utils/logger.utils.js'


await mongoose.connect(MONGODB_CNX_STR)
winstonLogger.info(`base de datos conectada a ${MONGODB_CNX_STR}`)

app.listen(PORT, ()=>winstonLogger.info(`!Servidor arriba en el puerto ${PORT}!`))
