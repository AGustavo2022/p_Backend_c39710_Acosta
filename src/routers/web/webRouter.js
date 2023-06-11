import express, { Router } from "express"
import * as viewsController from "../../controllers/views.controller.js"


export const webRouter = Router()

webRouter.use(express.json())
webRouter.use(express.urlencoded({ extended: true }))
webRouter.use(express.static('./public'))


webRouter.get('/login', viewsController.handleLogin)
webRouter.get('/register', viewsController.handleRegister)
webRouter.get('/products', viewsController.handleProducts)



