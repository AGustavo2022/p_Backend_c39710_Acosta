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
        let idProd = randomUUID();           
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

//testing..

//console.log ('testing ...')

//const productManager = new ProductManager ('./static/productManager.txt')

//console.log(await productManager.getProduct())

//await productManager.addProduct(new Producto('Producto Prueba 6','Este es un producto de prueba 6',200,'sin imagen','abc537v8',25))

//await productManager.addProduct(new Producto('Producto Prueba 7','Este es un producto de prueba 7',400,'sin imagen','abc7746',32))

//console.log(await productManager.getProduct())

//console.log(await productManager.getProductById('6bcecb3a-c126-43d5-a2bf-cdf851ad1713'))

//await productManager.updateProduct('6bcecb3a-c126-43d5-a2bf-cdf851ad1713','Producto Prueba 2','Este es un producto de prueba 2',300,'sin imagen','abc1234',101)

//await productManager.deleteProductId('55a406d7-aaa8-4438-a7c8-595a30d9c183')

//console.log(await productManager.getProduct())






