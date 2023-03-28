import { Router } from "express";
import { ProductManager } from "../productManager.js"

export const viewsRouter = Router()

export const produtcs = new ProductManager('./static/productos.json')

viewsRouter.get('/',  async (req, res) => {
    const productslist = await produtcs.getProduct()
    res.render('home.handlebars', { 
        titulo: 'Home', 
        encabezado: 'Lista de Productos', 
        product: [...productslist],
        productExist: productslist.length > 0

     })
})

viewsRouter.get('/realTimeProducts',  async (req, res) => {
    
    const productslist = await produtcs.getProduct()
    
    res.render('realTimeProducts.handlebars', { 
        titulo: 'RealTimeProducts ', 
        encabezado: 'Lista de Productos', 
        product: [...productslist],
        productExist: productslist.length > 0

        
     })
})