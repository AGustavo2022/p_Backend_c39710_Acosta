import { Router } from "express";
import { CartsManager } from "../dao/cartsManager.js"


export const cartsRouter = Router()

const carritos = new CartsManager ('./static/carritos.json')


cartsRouter.get('/:cid', async (req, res) =>{
    let id = req.params.cid
    const idCart = await carritos.getCartsById(id)
    res.send(idCart )
})

cartsRouter.post('/', async (req, res) =>{
    const newCarts = await carritos.postCarts()
    res.send(newCarts)
})

cartsRouter.post('/:cid/product/:pid', async (req, res) =>{
    let idCart = req.params.cid
    let idProduct = req.params.pid
    const cartsProduct = await carritos.postCartsProduct(idCart,idProduct)
    res.send(cartsProduct)
})