import { Router } from "express";
import { ProductDBManager } from "../dao/productDBManager.js"

export const viewsRouter = Router()

export const produtcs = new ProductDBManager()

viewsRouter.get('/',  async (req, res) => {
    const productslist = await produtcs.getProduct()
    res.render('products.handlebars', { 
        titulo: 'Products', 
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