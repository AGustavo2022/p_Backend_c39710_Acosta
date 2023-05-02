import { Router } from "express"
import { postUsuarios } from "../../controllers/usuarios.controller.js"


export const usuariosDbRouter = Router()


usuariosDbRouter.post('/', postUsuarios)