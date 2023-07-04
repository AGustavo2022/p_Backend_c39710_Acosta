import { Carts } from "../models/carts.models.js"
import { productosRepository } from '../repositories/products.repository.js'
import { cartsRepository } from "../repositories/carts.repository.js"


class CartsService {

    constructor() {}
    
    async getCarts (cid) {
        if (cid != undefined){
            const buscado = await cartsRepository.readOne({ id: cid })
            return buscado
        }else{
            const carts = await cartsRepository.readMany()
            return carts
        }
    }


    async postCarts (newData) {
        const cart = new Carts(newData)
        const creado = await cartsRepository.createIdMongoose(cart.dto())
        return creado
    }
    
    async deleteCart (cid) {
        const deleteCart = await cartsRepository.deleteOne({ id: cid }) 
        return deleteCart
    }


    async putCart (cid, updatedCart ) {
        const putCart = await  cartsRepository.updateOne({ id: cid }, updatedCart)
        return putCart
    }

    async agregarAlCarrito(idCart, idProduct) {

        const [carts] = await cartsRepository.readMany({id: idCart})
        if (!carts) throw new Error('No se puede agregar al carrito: CARRITO no encontrado')

        const [product] = await productosRepository.readManyProduct({id: idProduct})
        if (!product) throw new Error('No se puede agregar al carrito: PRODUCTO no encontrado')

        const existe = carts.productsCart.find(p => p.product.toString() === product._id.toString())

        if (existe === undefined) {

            cartsRepository.updateOne({
                id: idCart
            }, {
                $push: {
                    productsCart: [{
                        product: product._id,
                        quantity: 1
                    }]
                }
            })

        } else {

            const indice = carts.productsCart.findIndex(p => p.product.toString() == product._id.toString())

            const newQuantity = carts.productsCart[indice].quantity + 1

            await cartsRepository.updateOne({
                id: idCart
            }, {
                $set: {
                    [`productsCart.${indice}.quantity`]: newQuantity
                }
            });

        }
    }
}

export const cartsService = new CartsService()