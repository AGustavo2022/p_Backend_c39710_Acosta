import express, { Router } from 'express'
import { productsRouter } from "./productsRouter.js"
import { productsDbRouter } from './productsDbRouter.js'
import { cartsRouter } from './cartsRouter.js'

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

//apiRouter.use('/products', productsRouter)
apiRouter.use('/products', productsDbRouter)
apiRouter.use('/carts', cartsRouter)
