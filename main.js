class ProductManager {

    constructor() {
        this.productos = [];
    }
    
    getProduct() {
        return this.productos;
    }

    addProduct (producto) {
        
        const idProducto = this.productos.find(e => e.code == producto.code);

        if (!idProducto) {

            let idProducto =  Math.random().toString(30).substring(2);           

            const newProducto = {
                id: idProducto,
                ...producto
            }

            this.productos.push(newProducto);

        }else{
            console.log('El producto ya existe')
        }
        
    }

    getProductById (id) {
        
        const idProducto = this.productos.find(e => e.code === id);

        if (idProducto) {
            console.log(idProducto)
        }else{
            console.log('Not found')
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

//testing

console.log ('testing ...')

const productManager = new ProductManager

console.log(productManager.getProduct())

productManager.addProduct(new Producto('Producto Prueba','Este es un producto de prueba',200,'sin imagen','abc123',25))

console.log(productManager.getProduct())

productManager.addProduct(new Producto('Producto Prueba','Este es un producto de prueba',200,'sin imagen','abc123',25))

productManager.getProductById('abc123')

productManager.getProductById('abc1234')

