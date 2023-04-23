import mongoose, {Schema} from 'mongoose'


const schemaCarts = new Schema({
    products: [
          {
            product: { type: Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, required: true }
          }
        ]
}, { versionKey: false })

schemaCarts.pre('find', function(){
    this.populate('products.product')
})

export class CartsDBManager {

    constructor() {
        this.cartsDb = mongoose.model('carts', schemaCarts)
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
            
            //await this.postCarts()
        })
    }
}

// put 
// const filter = {_id: idCarts}
// const update = {products: [
//     {
//       product:  idProduct,
//       quantity: 1
//     }
//   ]}

// await this.cartsDb.updateOne(filter,update,{new: true,upsert: true}) 