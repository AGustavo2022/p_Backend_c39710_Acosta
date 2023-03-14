import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import { ProductManager } from "./productManager.js";


export class CartsManager {
    constructor (path) {
        this.path = path
        this.products = []
        //this.arrProducts = []
    }

    async getCarts() {
        this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return this.products
    }
    
    async getCartsById (id) {        
        const cartsTxt = await this.getCarts()
        const idCart = cartsTxt.find(e => e.id === id)
        if (!idCart){
            throw new Error ('El Id del producto buscado, No existe !!!')
        }
        return idCart
    }

    async postCarts() {
        const newCarts = await this.getCarts()
        let idCarts = randomUUID()        
        const newCart = {
            id: idCarts,
            products: []
        }
        newCarts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(newCarts, null, 2)) 
    }

    async postCartsProduct(idCarts, idProduct) {
        const productos = new ProductManager('./static/productos.json')
        const cartsTxts = await this.getCarts()
        const productId = await productos.getProductById(idProduct)
        const idCartbuscado = cartsTxts.findIndex(e => e.id === idCarts)
        
        if (idCartbuscado > -1){


            cartsTxts[idCartbuscado] = {
                id: idCarts, 
                products: [{
                    product:productId.id,
                    quatyti: 1
                }]
            }
            
            //cartsTxts.push(cartsTxts[idCartbuscado])

            await fs.writeFile(this.path, JSON.stringify(cartsTxts, null, 2))
            
        }else{
            throw new Error ('El Id del Carrito buscado, No existe !!!')
        }
    }
}


// const productos = new ProductManager('../static/productos.json') 
// const carritos = new CartsManager('../static/carritos.json')

//await carritos.postCarts()
// console.log(await carritos.getCartsById('e7e00458-e58b-42b2-957c-ebc7ac8e3907'))

//await carritos.postCartsProduct("67e930d5-b1f4-4472-89bc-02c05461a46a","329a7acd-1c3c-4534-b2ca-c2192f2c48d1")
//await carritos.postCartsProduct("67e930d5-b1f4-4472-89bc-02c05461a46a","1f575454-d97b-4954-b1fc-2ba54d2b2ff3")
//await carritos.postCartsProduct("67e930d5-b1f4-4472-89bc-02c05461a46a","4e12c13a-e2a4-48b7-bd16-4ef35b1a111e")

