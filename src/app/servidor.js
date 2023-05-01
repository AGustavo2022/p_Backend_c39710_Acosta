import  express  from "express";
import { engine } from 'express-handlebars'
import { apiRouter } from "../routers/apiRouter.js"
import { viewsRouter } from "../routers/viewsRouter.js"


export const app = express();


app.use(express.static('public'))
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use('/api', apiRouter)
app.use('/', viewsRouter)

