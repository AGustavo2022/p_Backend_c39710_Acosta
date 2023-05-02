import { Router } from "express"
import { deleteSesiones, postSesiones } from "../../controllers/sesiones.controller.js"



export const seccionesRouter = Router()


seccionesRouter.post('/', postSesiones)
seccionesRouter.delete('/', deleteSesiones)

