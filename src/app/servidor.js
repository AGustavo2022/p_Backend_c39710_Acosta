
import { COOKIE_SECRET } from "../config/auth.config.js";
import  express  from "express";
import { engine } from 'express-handlebars'
import { apiRouter } from "../routers/api/api.router.js"
import { webRouter } from "../routers/web/webRouter.js"
//import session from "../middleware/session.js"
//import { Server } from 'socket.io'
import cookieParser from "cookie-parser"
import { extraerToken } from "../middleware/authentication.js";


export const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('./public'))

app.use(cookieParser(COOKIE_SECRET))
app.use(extraerToken)


// app.use((req, res, next) => {
//     req['io'] = io
//     next()
// })

///////


app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


//app.use(session)

app.use('/api', apiRouter)
app.use('/', webRouter)



