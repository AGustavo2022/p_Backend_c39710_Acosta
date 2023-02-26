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
        if (!idProducto) {
            let idProducto = randomUUID();           
            const newProducto = {
                id: idProducto,
                ...producto
            }
            this.productos.push(newProducto);
            await fs.writeFile(this.path, JSON.stringify(this.productos), null, 2)
        }else{
            console.log('El producto ya existe')
        }        
    }

    async updateProduct (id, title,description,prince,thumbnail,code,stock) {
        const productosTxt = await this.getProduct()
        const idProducto = productosTxt.find(e => e.id === id);

        if (idProducto) {
            const newProducto = {
                ...{id},
                title: title,
                description: description,
                prince: prince,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }
            await fs.writeFile(this.path, JSON.stringify(newProducto))
        }else{
            console.log('Not found1')
        }
    }

    async getProductById (id) {        
        const productosTxt = await this.getProduct()
        const idProducto = productosTxt.find(e => e.id === id);
        if (idProducto) {
            console.log(idProducto)
        }else{
            console.log('Not found2')
        }
    }

    async deleteProductId (id) {
        const productosTxt = await this.getProduct()
        const indexArr = productosTxt.findIndex(e => e.id === id)
        if (indexArr) {           
            const newArr = productosTxt.splice(indexArr,1)
            await fs.writeFile(this.path, JSON.stringify(newArr))        
        }else{
            console.log('Not found3')
        }
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

console.log(await productManager.getProduct())

await productManager.addProduct(new Producto('Producto Prueba','Este es un producto de prueba',200,'sin imagen','abc123',25))

console.log(await productManager.getProduct())

//await productManager.getProductById('6bac27d8-f732-415c-8b61-e34109e8a620')

//await productManager.updateProduct('6bac27d8-f732-415c-8b61-e34109e8a620','Producto Prueba','Este es un producto de prueba2',300,'sin imagen','abc124',40)

//await productManager.deleteProductId('6bac27d8-f732-415c-8b61-e34109e8a620')

//console.log(await productManager.getProduct())






