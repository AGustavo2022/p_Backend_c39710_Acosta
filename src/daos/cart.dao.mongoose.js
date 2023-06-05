import mongoose, { Schema } from 'mongoose'
import { DaoMongoose } from './daoMongoose.js'


const cartSchema = new mongoose.Schema({
    id: {type: String, require: true},
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, required: true }
        }
    ]
}, { versionKey: false })

cartSchema.pre('find', function(){
    this.populate('products.product')
})

const cartsModel = mongoose.model('carts', cartSchema)

export const cartsDaoMongoose = new DaoMongoose(cartsModel)