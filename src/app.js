import  express  from "express";
import { apiRouter } from "./routers/apiRouter.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api', apiRouter)

app.listen(8080, ()=>console.log('!Servidor arriba en el puerto 8080!'))

