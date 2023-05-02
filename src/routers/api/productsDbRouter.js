import { Router } from "express";

import { deleteProduct, getProductId, getProductsAll, postProduct, putProduct } from "../../controllers/products.controller.js";

export const productsDbRouter = Router()


productsDbRouter.get('/',getProductsAll)   

productsDbRouter.get('/:pid', getProductId)

productsDbRouter.post('/', postProduct)

productsDbRouter.put('/:pid', putProduct)

productsDbRouter.delete('/:pid', deleteProduct)
