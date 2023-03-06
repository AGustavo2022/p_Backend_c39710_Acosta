import  express  from "express";
import { ProductManager } from "./main.js";

const app = express();
app.use(express.urlencoded({extended:true}))

const productos = new ProductManager('./static/productManager.txt')

const producto = await productos.getProduct()


app.get('/products', (req,res)=>{
    let limit = req.query.limit
    if (!limit) return res.send(producto)
    let productslimit = producto.slice(0, limit)
    res.send(productslimit)
})
    

app.get('/products/:pid', (req,res)=>{
    const idProducto = producto.find(e => e.id === req.params.pid)
    res.send(idProducto )
})


app.listen(8080, ()=>console.log('!Servidor arriba en el puerto 8080!'))