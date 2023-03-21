import  express  from "express";
import { apiRouter } from "./routers/apiRouter.js"
import { viewsRouter } from "./routers/viewsRouter.js"
import { engine } from 'express-handlebars'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))

app.use('/api', apiRouter)
app.use('/', viewsRouter)


app.listen(8080, ()=>console.log('!Servidor arriba en el puerto 8080!'))

