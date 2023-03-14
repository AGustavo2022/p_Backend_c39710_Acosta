import { Router } from "express";
import { ProductManager } from "../productManager.js"

export const productsRouter = Router()


const productos = new ProductManager('./static/productos.json')

productsRouter.get('/',async (req,res)=>{
    const producto = await productos.getProduct()
    let limit = req.query.limit
    if (!limit) return res.send(producto)
    let productslimit = producto.slice(0, limit)
    res.send(productslimit)
})

productsRouter.get('/:pid', async (req,res)=>{
    let id = req.params.pid
    const idProducto = await productos.getProductById(id)
    res.send(idProducto )
})

productsRouter.post('/', async (req,res)=>{
    const product = req.body
    const newProduct = await productos.addProduct(product)
    res.send(newProduct)
})

productsRouter.put('/:pid', async (req,res)=>{
    let id = req.params.pid
    const product = req.body
    const newProduct = await productos.updateProduct(id,product)
    res.send(newProduct)
})

productsRouter.delete('/:pid', async (req,res)=>{
    let id = req.params.pid
    const newProduct = await productos.deleteProductId(id)
    res.send(newProduct)
})