// import fs from 'fs/promises'
// import { randomUUID } from 'crypto'
import { ProductDBManager } from "./productDBManager.js";

import mongoose, {Schema, Types} from 'mongoose'


// export class CartsManager {
//     constructor (path) {
//         this.path = path
//         this.products = []
//         this.arrProducts = []
//     }

const schemaCarts = new Schema({
    products: {
        type: [
          {
            // product: { type: Schema.Types.ObjectId, ref: 'products' },
            product: { type: String},
            quantity: { type: Number }
          }
        ],
        default: []
      }
    }, { versionKey: false })

// const schemaCarts = new Schema({
//     products:[
//         {
//         product:{type: Schema.Types.ObjectId, ref: 'products'},
//         qty:{ type: Number, required: true}
//         }
    
//     ]},{versionKey: false})


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
            products: [],
        })
    }

    async postCartsProduct(idCarts, idProduct) {
        const idCart = await this.cartsDb.findById(idCarts).lean()
        .then(async()=> {

            //const idProducto = await this.cartsDb.findById(idProduct).lean()
            
            //.then(async()=>{
                console.log('ok')

                const newListProducts = {
                    products: [{
                        product:idProduct,
                        qty: 1
                    }]
                }

                await this.cartsDb.updateOne({_id: idCarts},{$push:{products:newListProducts}}) 

                // products: {type: Array,default: [{
                //     product:{type: Schema.Types.ObjectId, ref: 'products'},
                //     qty:{ type: Number, default: 1, required: true}
                // const quantity = 2
                // await this.cartsDb.updateOne({products: idProduct},{$push:{qty2:quantity}})  
            //})
            //.catch(async()=>{

                //console.log('no ok')

                // const newListProducts = {
                //     products: [{
                //         product:idProduct,
                //         qty: 1
                //     }]
                // }

                // await this.cartsDb.updateOne({_id: idCarts},{$push:{products:newListProducts}})

            //     const newListProducts = {
            //     products: idProduct,
            //     qty:1
            //     }

            //     await this.cartsDb.updateOne({_id: idCarts},{$push:{products:newListProducts}}) 
            // 
        //})

            
        })
        .catch(async()=>{
            await this.postCarts()
        })

        // }
        // if(idCarts2){
            
        // }else{
        //     this.postCarts()
        // }

        //idCarts2 == null?this.postCarts():'il id ya exdiste'   


    // const productsDb = new ProductDBManager()
    // const cartsTxts = await this.getCarts()
    // const productId = await productsDb.getProductById(idProduct)
    // const idCartbuscado = cartsTxts.findIndex(e => e.id === idCarts)


    //     if (idCartbuscado > -1){

    //         cartsTxts[idCartbuscado] = {
    //             id:idCarts,
    //             products: [{
    //                 product:productId.id,
    //                 quatyti: 1}
    //         ]
    //         }


    //         console.log(this.arrProducts)


    //         await fs.writeFile(this.path, JSON.stringify(cartsTxts, null, 2))

    //     }else{
    //         throw new Error ('El Id del Carrito buscado, No existe !!!')
    //     }
    // }
}
}








