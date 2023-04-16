import { Router } from "express";
import { ProductDBManager } from '../dao/productDBManager.js'

export const productsDbRouter = Router()


const productosDb = new ProductDBManager()

productsDbRouter.get('/',async (req,res)=>{
    const producto = await productosDb.getProduct()
    console.log(producto)
    let limit = req.query.limit
    if (!limit) return res.send(producto)
    let productslimit = producto.slice(0, limit)
    res.send(productslimit)
})

// productsRouter.get('/:pid', async (req,res)=>{
//     let id = req.params.pid
//     const idProducto = await productos.getProductById(id)
//     res.send(idProducto )
// })

productsDbRouter.post('/', async (req,res)=>{
    const product = req.body
    console.log(product)
    await productosDb.addProduct(product)
    res.send(product)
})

// productsRouter.put('/:pid', async (req,res)=>{
//     let id = req.params.pid
//     const product = req.body
//     const newProduct = await productos.updateProduct(id,product)
//     res.send(newProduct)
// })

// productsRouter.delete('/:pid', async (req,res)=>{
//     let id = req.params.pid
//     const newProduct = await productos.deleteProductId(id)
//     res.send(newProduct)
// })