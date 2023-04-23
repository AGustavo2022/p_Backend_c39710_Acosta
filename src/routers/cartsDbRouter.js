import { Router } from "express";
import { CartsDBManager } from "../dao/cartsDbManager.js"


export const cartsDbRouter = Router()

const cartsDb = new CartsDBManager ()


cartsDbRouter.get('/:cid', async (req, res) =>{
    let id = req.params.cid
    const idCart = await cartsDb.getCartsById(id)
    res.send(idCart )
})

cartsDbRouter.post('/', async (req, res) =>{
    await cartsDb.postCarts()
    res.send('ok')
})

cartsDbRouter.post('/:cid/product/:pid', async (req, res) =>{
    let idCart = req.params.cid
    let idProduct = req.params.pid
    await cartsDb.postCartsProduct(idCart,idProduct)
    res.send('ok POST cartsDBRouters')
})

cartsDbRouter.put('/:cid/product/:pid', async (req, res) =>{
    let idCart = req.params.cid
    let idProduct = req.params.pid
    let update = req.body
    await cartsDb.postCartsProduct(idCart,idProduct, update)
    res.send('ok PUT cartsDBRouters')
})