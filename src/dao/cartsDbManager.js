import { cartsModel } from "./models/cart.model.js"

export class CartsDBManager {

    constructor() {
        this.cartsDb = cartsModel
    }

    async getCarts() {
        const cartsDb = await this.cartsDb.find().lean()
        return cartsDb
    }

    async getCartsById (id) {        
        const cartsDb = await this.cartsDb.findById(id).lean()    
        return cartsDb
    }

    async postCarts() {
        await this.cartsDb.create({
            products:[]
        })
    }

    async postCartsProduct(idCarts, idProduct) {

        const idCart = await this.cartsDb.findById({_id:idCarts}).lean()
        .then(async()=> {
            const idCart = await this.cartsDb.findById({_id:idCarts}).lean()
            const productId =  idCart.products.find(p => p.product.toString() === idProduct.toString())
            if (productId){
                
                const qty = productId.quantity + 1
                const iDProd = productId._id.toString()


                await this.cartsDb.updateOne({_id: idCarts, "products._id":iDProd},
                {
                    $set: {"products.$.quantity":qty}
                }) 

            }else{

                const products = {
                    product:idProduct,
                    quantity:1
                }
                await this.cartsDb.updateOne({_id: idCarts},{$push:{products:products}}) 
           
            }
        })
            
        .catch(async()=>{

            console.log('No existe el ID del carrito')
        
        })
    }
}
