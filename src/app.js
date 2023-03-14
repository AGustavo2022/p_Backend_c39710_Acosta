import  express  from "express";
import { ProductManager } from "./productManager.js";
import { CartsManager } from "./cartsManager.js"

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productos = new ProductManager('./static/productos.json')
const carritos = new CartsManager('./static/carritos.json')


/*    PRODUCTOS   */

app.get('/api/products', async (req,res)=>{
    const producto = await productos.getProduct()
    let limit = req.query.limit
    if (!limit) return res.send(producto)
    let productslimit = producto.slice(0, limit)
    res.send(productslimit)
})
    

app.get('/api/products/:pid', async (req,res)=>{
    let id = req.params.pid
    const idProducto = await productos.getProductById(id)
    res.send(idProducto )
})

app.post('/api/products', async (req,res)=>{
    const product = req.body
    const newProduct = await productos.addProduct(product)
    res.send(newProduct)
})

app.put('/api/products/:pid', async (req,res)=>{
    let id = req.params.pid
    const product = req.body
    const newProduct = await productos.updateProduct(id,product)
    res.send(newProduct)
})

app.delete('/api/products/:pid', async (req,res)=>{
    let id = req.params.pid
    const newProduct = await productos.deleteProductId(id)
    res.send(newProduct)
})

/* CARRITOS */

app.get('/api/carts/:cid', async (req, res) =>{
    let id = req.params.cid
    const idCart = await carritos.getCartsById(id)
    res.send(idCart )
})

app.post('/api/carts', async (req, res) =>{
    const newCarts = await carritos.postCarts()
    res.send(newCarts)
})

app.post('/api/carts/:cid/product/:pid', async (req, res) =>{
    let idCart = req.params.cid
    let idProduct = req.params.pid
    const cartsProduct = await carritos.postCartsProduct(idCart,idProduct)
    res.send(cartsProduct)
})


app.listen(8080, ()=>console.log('!Servidor arriba en el puerto 8080!'))

