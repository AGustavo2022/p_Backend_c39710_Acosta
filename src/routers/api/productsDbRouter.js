import { Router } from "express";

import  controller from "../../controllers/products.controller.js";

export const productsDbRouter = Router()


productsDbRouter.get('/', controller.getProductsAll)   

productsDbRouter.get('/:pid', controller.getProductId)

productsDbRouter.post('/', controller.postProduct)

productsDbRouter.put('/:pid', controller.putProduct)

productsDbRouter.delete('/:pid', controller.deleteProduct)
