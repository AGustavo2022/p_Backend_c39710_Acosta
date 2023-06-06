import { Router } from "express"
import * as sessionController from "../../controllers/sesiones.controller.js"



export const sessionRouter = Router()


sessionRouter.post('/', sessionController.handlePost)
sessionRouter.delete('/', sessionController.handleDelete)

 