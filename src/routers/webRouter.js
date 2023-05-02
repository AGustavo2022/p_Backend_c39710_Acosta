import express, { Router } from "express"
import { registerView } from "../controllers/register.controllers.js"
import { loginView } from "../controllers/login.controller.js"


export const webRouter = Router()

webRouter.use(express.json())
webRouter.use(express.urlencoded({ extended: true }))
webRouter.use(express.static('./public'))


webRouter.get('/login', loginView)
webRouter.get('/register', registerView)


