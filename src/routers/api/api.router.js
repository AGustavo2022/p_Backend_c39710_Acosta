import express, { Router } from 'express'
import { productsRouter } from './products.router.js'
import {cartsRouter} from './carts.router.js'
import { usuariosRouter} from './users.router.js'
//import { seccionesRouter } from './sesiones.router.js'

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))
apiRouter.use(express.static('./public'))


apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', cartsRouter)

apiRouter.use('/user', usuariosRouter)
//apiRouter.use('/sesiones', seccionesRouter)

