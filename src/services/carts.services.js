import { Carts } from "../models/carts.models.js"
import { productosRepository } from '../repositories/products.repository.js'
import { cartsRepository } from "../repositories/carts.repository.js"

class CartsService {
    
    async agregarAlCarrito(idCart, idProduct) {

        const [carts] = await cartsRepository.readMany({ id: idCart })
        if (!carts) throw new Error('No se puede agregar al carrito: CARRITO no encontrado')

        const [product] = await productosRepository.readMany({ id: idProduct })
        if (!product) throw new Error('No se puede agregar al carrito: PRODUCTO no encontrado')

        const products  = {
            id: product.id,
            qty : 1
        } 

        cartsRepository.updateOne({id:idCart}, {$push:{products:products }})

    }

    // async postCart() {

    //     const cart = new Carts(arr, arr2)
        
    //     console.log(creada)
        
    //     const creada = await cartsRepository.create(cart.dto())

        
        
    //     return creada
    // }
}

export const cartsService = new CartsService()