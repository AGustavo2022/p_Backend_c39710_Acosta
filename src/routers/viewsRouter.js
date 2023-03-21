import { Router } from "express";
//import { ProductManager } from "../productManager.js"

export const viewsRouter = Router()




viewsRouter.get('/',  async (req, res) => {

    res.render('index.handlebars', { titulo: 'Inicio', encabezado: 'Inicio' })
})