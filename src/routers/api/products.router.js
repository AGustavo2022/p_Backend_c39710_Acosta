import { Router } from "express"

import * as productsController from '../../controllers/products.controller.js'
import { soloAdministradores } from "../../middleware/authentication.js"


export const productsRouter = Router()


productsRouter.get('/:id?', soloAdministradores, productsController.handleGet)   

productsRouter.post('/', soloAdministradores, productsController.handlePost)

productsRouter.put('/:id', soloAdministradores, productsController.handlePut)

productsRouter.delete('/:id', soloAdministradores, productsController.handleDelete)
