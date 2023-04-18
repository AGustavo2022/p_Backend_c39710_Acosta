import express, { Router } from 'express'
import { productsDbRouter } from './productsDbRouter.js'
import {cartsDbRouter} from './cartsDbRouter.js'

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))


apiRouter.use('/products', productsDbRouter)
apiRouter.use('/carts', cartsDbRouter)
