import { Router } from "express";
import { ProductDBManager } from '../dao/productDBManager.js'

export const productsDbRouter = Router()


const productosDb = new ProductDBManager()

productsDbRouter.get('/',async (req,res)=>{
    const producto = await productosDb.getProduct()
    let limit = req.query.limit
    if (!limit) return res.send(producto)
    let productslimit = producto.slice(0, limit)
    res.send(productslimit)
})

productsDbRouter.get('/:pid', async (req,res)=>{
    let id = req.params.pid
    const idProducto = await productosDb.getProductById(id)
    res.send(idProducto )
})

productsDbRouter.post('/', async (req,res)=>{
    const product = req.body
    console.log(product)
    await productosDb.addProduct(product)
    res.send('ok')
})

productsDbRouter.put('/:pid', async (req,res)=>{
    let id = req.params.pid
    const product = req.body
    const putProduct = await productosDb.updateProduct(id,product)
    res.send(putProduct)
})

productsDbRouter.delete('/:pid', async (req,res)=>{
    let id = req.params.pid
    const newProduct = await productosDb.deleteProductId(id)
    res.send(newProduct)
})