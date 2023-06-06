import express, { Router } from "express"


export const webRouter = Router()

webRouter.use(express.json())
webRouter.use(express.urlencoded({ extended: true }))
webRouter.use(express.static('./public'))


webRouter.get('/login', (req, res, next)=>{
    res.render('login', {titulo: 'Login'})
})
webRouter.get('/register', (req, res, next)=>{
    res.render('registrate', { titulo: 'Registro' })
})


