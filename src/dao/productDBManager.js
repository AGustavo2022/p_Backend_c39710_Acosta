import mongoose, { Schema } from 'mongoose'


const schemaProducts = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true, min: 1 },
    code: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: Boolean, required: true }
}, { versionKey: false })


export class ProductDBManager {

    constructor() {
        this.productsDb = mongoose.model('products', schemaProducts)
    }
    
    async getProduct() {
        const productsDb = await this.productsDb.find().lean()
        return productsDb
    }

    async addProduct (producto) {        
        const productsDb = await this.getProduct()
        const idProducto = productsDb.find(e => e.code == producto.code);
        if (idProducto) {
            throw new Error ('El producto ya existe')
        }  
        await this.productsDb.create(producto)
    }
    
    async getProductById (id) {    
        const productsDb = await this.productsDb.findById(id).lean()    
        return productsDb
    }

    async updateProduct (id,updateProduct) {
        const productsId = await this.productsDb.findById(id).lean()          
        if (productsId == null) {
            throw new Error ('El Id del producto que se quiere actualizar, No existe !!!')
        }
        console.log(updateProduct)
        await this.productsDb.updateOne({_id: id},{$set:updateProduct})
    }
    

    async deleteProductId (id) {
        const indexArr = await this.productsDb.findById(id).lean() 
        if (indexArr == null) {     
                throw new Error ('El Id del producto que se quiere eliminar, No existe !!!')
            }
        await this.productsDb.deleteOne({_id: id})
            
    }
}
