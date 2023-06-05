import { Router } from "express"
import * as userController from "../../controllers/users.controller.js"


export const usuariosRouter = Router()

usuariosRouter.get('/:id?', userController.handleGet)
usuariosRouter.post('/', userController.handlePost)