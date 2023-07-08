
import { Router } from 'express'
import { isAuthenticated } from "../../middleware/authentication.js"
import * as cartsController from '../../controllers/carts.controller.js'

export const cartsRouter = Router()

cartsRouter.get('/:id?', isAuthenticated, cartsController.handleGet)
//cartsRouter.post('/', cartsController.handlePost)
cartsRouter.delete('/:id', isAuthenticated, cartsController.handleDelete)
cartsRouter.post('/:cid/product/:pid', isAuthenticated, cartsController.handlePostProduct)
cartsRouter.put('/:cid/product/:pid', isAuthenticated, cartsController.handlePut)
cartsRouter.delete('/:cid/product/:pid', isAuthenticated, cartsController.handleDelete)
cartsRouter.post('/:cid/purchase', isAuthenticated, cartsController.handlePostPurchase)

