import  express  from "express";
import { ProductManager } from "./main.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productos = new ProductManager('./static/productManager.txt')




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
    const product = req.body
    const newProduct = await productos.updateProduct(product)
    res.send(newProduct)
})

app.delete('/api/products/:pid', async (req,res)=>{
    let id = req.params.pid
    const newProduct = await productos.deleteProductId(id)
    res.send(newProduct)
})



app.listen(8080, ()=>console.log('!Servidor arriba en el puerto 8080!'))

