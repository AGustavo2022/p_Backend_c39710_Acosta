
import { io } from '../app.js'
import { ProductManager } from "../productManager.js"

const produtcs = new ProductManager('./static/productos.json')

export async function socketHandle(req, res, next) {
  const products = await produtcs.getProduct()
  io.emit('updateList', {
    product: products,
    productExist: products.length > 0
  })
}
