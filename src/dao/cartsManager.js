import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import { ProductManager } from "./productManager.js";


export class CartsManager {
    constructor (path) {
        this.path = path
        this.products = []
        this.arrProducts = []
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
                id:idCarts,
                products: [{
                    product:productId.id,
                    quatyti: 1}
            ]
            }
            
            
            console.log(this.arrProducts)
            

            await fs.writeFile(this.path, JSON.stringify(cartsTxts, null, 2))
            
        }else{
            throw new Error ('El Id del Carrito buscado, No existe !!!')
        }
    }
}


