import fs from 'fs/promises'
import { randomUUID } from 'crypto'


 export class ProductManager {

    constructor(path) {
        this.products = []
        this.path = path
    }
    
    async getProduct() {
        this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return this.products
    }

    async addProduct (producto) {        
        const productsTxt = await this.getProduct()
        const idProducto = productsTxt.find(e => e.code == producto.code);
        if (idProducto) {
            throw new Error ('El producto ya existe')
        }
        let idProd = randomUUID()           
        const newProducto = {
            id: idProd,
            ...producto
        }
        this.products.push(newProducto);
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))       
    }

    async updateProduct (id,title, description, code, prince, status, stock, category, thumbnail) {
        const productosTxt = await this.getProduct()
        const idexProducto = productosTxt.findIndex(e => e.id === id);      
        if (idexProducto == -1) {
            throw new Error ('El Id del producto que se quiere actualizar, No existe !!!')
        }
        productosTxt[idexProducto] = {
            ...{id},
            title: title,
            description: description,
            code: code,
            prince: prince,
            status: status,
            stock: stock,
            category: category,
            thumbnail: thumbnail
        }
        await fs.writeFile(this.path, JSON.stringify(productosTxt, null, 2))
    }

    async getProductById (id) {        
        const productosTxt = await this.getProduct()
        const idProducto = productosTxt.find(e => e.id === id)
        if (!idProducto){
            throw new Error ('El Id del producto buscado, No existe !!!')
        }
        return idProducto
    }

    async deleteProductId (id) {
        const productosTxt = await this.getProduct()
        const indexArr = productosTxt.findIndex(e => e.id === id)
        if (indexArr == -1) {     
            throw new Error ('El Id del producto que se quiere eliminar, No existe !!!')
        }
        productosTxt.splice(indexArr,1)
        await fs.writeFile(this.path, JSON.stringify(productosTxt, null, 2))        
    }
}

export class Products {
    constructor(title, description, code, prince, status, stock, category, thumbnail) {
        this.title = title
        this.description = description
        this.code = code
        this.prince = prince
        this.status = status
        this.stock = stock
        this.category = category
        this.thumbnail = thumbnail
    }
}

