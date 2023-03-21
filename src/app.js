import  express  from "express";
import { engine } from 'express-handlebars'

import { apiRouter } from "./routers/apiRouter.js"
import { viewsRouter } from "./routers/viewsRouter.js"

const app = express();

app.use('/static', express.static('./static'))

app.engine('handlebars', engine())
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api', apiRouter)
app.use('/', viewsRouter)




app.listen(8080, ()=>console.log('!Servidor arriba en el puerto 8080!'))

