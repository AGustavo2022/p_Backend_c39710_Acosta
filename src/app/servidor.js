import { PORT } from "../config/servidor.config.js"
import { COOKIE_SECRET } from "../config/auth.config.js";
import  express  from "express";
import { engine } from 'express-handlebars'
import { apiRouter } from "../routers/apiRouter.js"
import { webRouter } from "../routers/webRouter.js"
import session from "../middleware/session.js"
import { Server } from 'socket.io'
import cookieParser from "cookie-parser"



export const app = express();

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use(express.static('./public'))
///////


const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en puerto ${PORT}`)
})

const io = new Server(server)

io.on('connection', async socket => {
    console.log('cliente nuevo conectado')
})

app.use(cookieParser(COOKIE_SECRET))

app.use((req, res, next) => {
    req['io'] = io
    next()
})

///////
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(session)

app.use('/api', apiRouter)
app.use('/', webRouter)

