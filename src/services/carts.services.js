//import { Carts } from "../models/carts.models.js"
//import { Products } from "../models/"
import { productosRepository } from '../repositories/products.repository.js'
import { cartsRepository } from "../repositories/carts.repository.js"
import mongoose from 'mongoose'

class CartsService {
    
    async agregarAlCarrito(idCart, idProduct) {

        const [carts] = await cartsRepository.readMany({ id: idCart })
        if (!carts) throw new Error('No se puede agregar al carrito: CARRITO no encontrado')

        const [product] = await productosRepository.readMany({ _id: idProduct })
        if (!product) throw new Error('No se puede agregar al carrito: PRODUCTO no encontrado')

        // const products = {
        //     id: product.id,
        //     qty : 1
        // } 

        // console.log (products)

        cartsRepository.updateOne(
            {id:idCart}, 
            {
                $push:
                {
                    productsCart:[{
                        product: idProduct,
                        quantity: 1
                    }] 
                }
            })

    }

    // async postCart() {

    //     const cart = new Carts(arr, arr2)
        
    //     console.log(creada)
        
    //     const creada = await cartsRepository.create(cart.dto())

        
        
    //     return creada
    // }
}

export const cartsService = new CartsService()