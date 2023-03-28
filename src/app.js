import  express  from "express";
import { engine } from 'express-handlebars'

import { apiRouter } from "./routers/apiRouter.js"
import { viewsRouter } from "./routers/viewsRouter.js"

import { socketHandle } from "./middleware/socket.js";

import { Server as SocketIOServer } from 'socket.io'

const app = express();

const httpServer = app.listen(8080, ()=>console.log('!Servidor arriba en el puerto 8080!'))

export const io = new SocketIOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/static', express.static('./static'))


app.engine('handlebars', engine())
app.set('views', './views')


app.use('/api', apiRouter)
app.use('/', viewsRouter)


io.on('connection', async clientSocket => {
    console.log(`nuevo cliente conectado! socket id #${clientSocket.id}`)
    await socketHandle()
})
    
    