import express, { Router } from 'express'
import { productsDbRouter } from './api/productsDbRouter.js'
import {cartsDbRouter} from './api/cartsDbRouter.js'
import { usuariosDbRouter} from './api/usuariosDbRouter.js'
import { seccionesRouter } from './api/sesiones.Router.js'

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))
apiRouter.use(express.static('./public'))


apiRouter.use('/products', productsDbRouter)
apiRouter.use('/carts', cartsDbRouter)

apiRouter.use('/usuarios', usuariosDbRouter)
apiRouter.use('/sesiones', seccionesRouter)

