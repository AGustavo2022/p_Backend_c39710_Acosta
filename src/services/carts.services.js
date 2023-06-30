//import { Carts } from "../models/carts.models.js"
//import { Products } from "../models/"
import { productosRepository } from '../repositories/products.repository.js'
import { cartsRepository } from "../repositories/carts.repository.js"
import mongoose from 'mongoose'

class CartsService {
    
    async agregarAlCarrito(idCart, idProduct) {

        const [carts] = await cartsRepository.readMany({ id: idCart })
        if (!carts) throw new Error('No se puede agregar al carrito: CARRITO no encontrado')

        const [product] = await productosRepository.readManyProduct ({ id: idProduct })
        if (!product) throw new Error('No se puede agregar al carrito: PRODUCTO no encontrado')

        const existe = carts.productsCart.find(p=> p.product.toString() === product._id.toString())

        //console.log(carts)

        //const a1 = product._id.toString()

        //const indice = (carts.productsCart.indexOf(existe._id.toString()))

        const indice = carts.productsCart.find

        //console.log(a1)
        console.log(indice)

        // if (existe === undefined) {


        //     cartsRepository.updateOne({
        //         id: idCart
        //     }, {
        //         $push: {
        //             productsCart: [{
        //                 product: product._id,
        //                 quantity: 1
        //             }]
        //         }
        //     })
        // }else{
        //     const a1 = product._id.toString()

        //     const indice = (productsCart.indexOf(existe._id.toString()))

        //     //console.log(a1)
        //     console.log(indice)

        //     //console.log(carts.productsCart[1].quantity)

        //     // cartsRepository.updateOne({
        //     //     id: idCart, 'productsCart.products'
        //     // }, {
        //     //     $push: {
        //     //         productsCart: [{
        //     //             quantity: 3
        //     //         }]
        //     //     }
        //     // })
        // }
    
    }

}

export const cartsService = new CartsService()