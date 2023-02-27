import fs from 'fs/promises'
import { randomUUID } from 'crypto'


class ProductManager {

    constructor(path) {
        this.productos = []
        this.path = path
    }
    
    async getProduct() {
        this.productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return this.productos
    }

    async addProduct (producto) {        
        const productosTxt = await this.getProduct()
        const idProducto = productosTxt.find(e => e.code == producto.code);
        if (idProducto) {
            throw new Error ('El producto ya existe')
        }
        let idProd = randomUUID();           
        const newProducto = {
            id: idProd,
            ...producto
        }
        this.productos.push(newProducto);
        await fs.writeFile(this.path, JSON.stringify(this.productos, null, 2))       
    }

    async updateProduct (id, title,description,prince,thumbnail,code,stock) {
        const productosTxt = await this.getProduct()
        const idexProducto = productosTxt.findIndex(e => e.id === id);      
        if (idexProducto == -1) {
            throw new Error ('El Id del producto que se quiere actualizar, No existe !!!')
        }
        productosTxt[idexProducto] = {
            ...{id},
            title: title,
            description: description,
            prince: prince,
            thumbnail: thumbnail,
            code: code,
            stock: stock
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

class Producto {
    constructor(title, description, prince, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.prince = prince
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

//testing..

console.log ('testing ...')

const productManager = new ProductManager ('./static/productManager.txt')

//console.log(await productManager.getProduct())

//await productManager.addProduct(new Producto('Producto Prueba','Este es un producto de prueba',200,'sin imagen','abc123',25))

//await productManager.addProduct(new Producto('Producto Prueba 3','Este es un producto de prueba 3',400,'sin imagen','abc12345',32))

//console.log(await productManager.getProduct())

console.log(await productManager.getProductById('6bcecb3a-c126-43d5-a2bf-cdf851ad1713'))

//await productManager.updateProduct('6bcecb3a-c126-43d5-a2bf-cdf851ad1713','Producto Prueba 2','Este es un producto de prueba 2',300,'sin imagen','abc1234',101)

//await productManager.deleteProductId('55a406d7-aaa8-4438-a7c8-595a30d9c183')

//console.log(await productManager.getProduct())






