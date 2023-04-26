import { Router } from "express";
import { ProductDBManager } from '../dao/productDBManager.js'
import { productModel } from "../dao/models/product.model.js";

export const productsDbRouter = Router()


const productosDb = new ProductDBManager()

productsDbRouter.get('/',async (req,res)=>{

    let limit = req.query.limit ?? 5
    let page = req.query.page ?? 1
    let query = req.query.query
    let sort = req.query.sort

    let queryList = {limit, page, sort, query}
    
    const payload = await productosDb.getProductQuery(queryList)
    
    res.send(payload)
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



// productsDbRouter.get('/',async (req,res)=>{
//     const producto = await productosDb.getProduct()
//     let limit = req.query.limit
//     if (!limit) return res.send(producto)
//     let productslimit = producto.slice(0, limit)
//     res.send(productslimit)
// })

// result.prevLink = result.hasPrevPage?`http://localhost:8080/students?page=${result.prevPage}`:'';
    // result.nextLink = result.hasNextPage?`http://localhost:8080/students?page=${result.nextPage}`:'';
    // result.isValid= !(page<=0||page>result.totalPages)