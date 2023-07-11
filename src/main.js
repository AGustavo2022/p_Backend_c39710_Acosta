import 'dotenv/config'
import './app/servidor.js'
import mongoose from 'mongoose'
import  { app } from './app/servidor.js'
import { MONGODB_CNX_STR } from './config/database.config.js'
import { PORT } from './config/servidor.config.js'
import { winstonLogger as logger } from './utils/logger.js'

await mongoose.connect(MONGODB_CNX_STR)
logger.info(`base de datos conectada a ${MONGODB_CNX_STR}`)

app.listen(PORT, ()=>logger.info(`!Servidor arriba en el puerto ${PORT}!`))
