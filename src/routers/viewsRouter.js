import { Router } from "express";
import { ProductManager } from "../productManager.js"

export const viewsRouter = Router()

const produtcs = new ProductManager('./static/productos.json')

viewsRouter.get('/',  async (req, res) => {

    const productslist = await produtcs.getProduct()

    res.render('home.handlebars', { 
        titulo: 'Home/Handlebars ', 
        encabezado: 'Lista de Productos', 
        product: [...productslist],
        productExist: productslist.length > 0

     })
})