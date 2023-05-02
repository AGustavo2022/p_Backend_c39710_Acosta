import  express  from "express";
import { engine } from 'express-handlebars'
import { apiRouter } from "../routers/apiRouter.js"
import { webRouter } from "../routers/webRouter.js"
import session from "../middleware/session.js"



export const app = express();

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(session)

app.use('/api', apiRouter)
app.use('/', webRouter)

