import  express  from "express";
import { PORT } from '../config/servidor.config.js'
import { engine } from 'express-handlebars'

import { apiRouter } from "../routers/apiRouter.js"
import { viewsRouter } from "../routers/viewsRouter.js"

import { conectar } from "../database/mongoose.js";

import { socketHandle } from "../middleware/socket.js";

import { Server as SocketIOServer } from 'socket.io'

await conectar()

const app = express();

const httpServer = app.listen(PORT, ()=>console.log('!Servidor arriba en el puerto 8080!'))

export const io = new SocketIOServer(httpServer)

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


app.use('/api', apiRouter)
app.use('/', viewsRouter)


io.on('connection', async clientSocket => {
    console.log(`nuevo cliente conectado! socket id #${clientSocket.id}`)
    await socketHandle()
})
    
    