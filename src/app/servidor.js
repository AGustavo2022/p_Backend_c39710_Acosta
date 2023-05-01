import  express  from "express";
import { PORT } from '../config/servidor.config.js'
import { engine } from 'express-handlebars'
import { apiRouter } from "../routers/apiRouter.js"
import { viewsRouter } from "../routers/viewsRouter.js"
import { conectar } from "../database/mongoose.js";

await conectar()

const app = express();


app.use(express.static('public'))
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use('/api', apiRouter)
app.use('/', viewsRouter)

app.listen(PORT, ()=>console.log(`!Servidor arriba en el puerto ${PORT}!`))
    