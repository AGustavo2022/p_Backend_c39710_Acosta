import mongoose, { Schema } from 'mongoose'

const CartsCollection = "carts"

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

export const cartsModel = mongoose.model(CartsCollection, schemaCarts)