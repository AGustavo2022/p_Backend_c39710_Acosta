// import fs from 'fs/promises'
// import { randomUUID } from 'crypto'
import mongoose, { Schema } from 'mongoose'


export const schemaProducts = new mongoose.Schema({
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
        this.iD = 0
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
        const productDb = await this.productsDb.create(producto)
        return productDb
    }

//     async updateProduct (id,updateProduct) {
//         const productosTxt = await this.getProduct()
//         const idexProducto = productosTxt.findIndex(e => e.id === id);      
//         if (idexProducto == -1) {
//             throw new Error ('El Id del producto que se quiere actualizar, No existe !!!')
//         }
//         productosTxt[idexProducto] = {
//             id,
//             ...updateProduct
//         }
//         await fs.writeFile(this.path, JSON.stringify(productosTxt, null, 2))
//     }

//     async getProductById (id) {        
//         const productosTxt = await this.getProduct()
//         const idProducto = productosTxt.find(e => e.id === id)
//         if (!idProducto){
//             throw new Error ('El Id del producto buscado, No existe !!!')
//         }
//         return idProducto
//     }

//     async deleteProductId (id) {
//         const productosTxt = await this.getProduct()
//         const indexArr = productosTxt.findIndex(e => e.id === id)
//         if (indexArr == -1) {     
//             throw new Error ('El Id del producto que se quiere eliminar, No existe !!!')
//         }
//         productosTxt.splice(indexArr,1)
//         await fs.writeFile(this.path, JSON.stringify(productosTxt, null, 2))        
//     }
}

export class Products {
    constructor(title, description, prince, thumbnail, stock, code, category, status) {
        this.title = title
        this.description = description
        this.prince = prince
        this.thumbnail = thumbnail
        this.stock = stock
        this.code = code
        this.category = category
        this.status = status
    }
}
