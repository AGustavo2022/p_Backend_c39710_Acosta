
import { Router } from 'express'
import { isAuthenticated } from "../../middleware/authentication.js"
import * as cartsController from '../../controllers/carts.controller.js'

export const cartsRouter = Router()

cartsRouter.get('/:id?', cartsController.handleGet)
cartsRouter.post('/', cartsController.handlePost)
cartsRouter.delete('/:id', cartsController.handleDelete)
cartsRouter.post('/:cid/product/:pid', isAuthenticated, cartsController.handlePostProduct)

