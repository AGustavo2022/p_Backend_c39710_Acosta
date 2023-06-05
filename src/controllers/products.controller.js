import { Products } from '../models/product.models.js'
import { productosRepository } from '../repositories/products.repository.js'


export async function handleGet(req, res, next) {
    try {
      if (req.params.id) {
        const buscado = await productosRepository.readOne({ id: req.params.id })
        res.json(buscado)
      } else {
        const productos = await productosRepository.readMany(req.query)
        res.json(productos)
      }
    } catch (error) {
      next(error)
    }
}

export async function handlePost(req, res, next) {
    try {
      const producto = new Products(req.body)
      const creado = await productosRepository.create(producto.dto())
      res.status(201).json(creado)
    } catch (error) {
      next(error)
    }
}
  
export async function handlePut(req, res, next) {
    try {
      const actualizado = await productosRepository.updateOne(req.params.id, req.body)
      res.json(actualizado)
    } catch (error) {
      next(error)
    }
}
  
export async function handleDelete(req, res, next) {
    try {
      const borrado = await productosRepository.deleteOne(req.params.id)
      res.json(borrado)
    } catch (error) {
      next(error)
    }
}

// import { ProductDBManager } from '../managers/productDBManager.js'
// import { postSesiones } from './sesiones.controller.js'

// const productosDb = new ProductDBManager()

// export  async function getProductsAll (req,res,next) {

//     let limit = req.query.limit ?? 5
//     let page = req.query.page ?? 1
//     let query = req.query.query
//     let sort = req.query.sort

//     let queryList = {limit, page, sort, query}

//     const payload = await productosDb.getProductQuery(queryList)
//     const name = req.session.user.name
//     const roles = req.session.user.roles

//     res.render('products', {

//         titulo: 'Products', 
//         encabezado: 'Lista de Productos',
//         hayDocs: payload.docs.length > 0,
//         docs: payload.docs,
//         limit: payload.limit,
//         page: payload.page,
//         totalPages: payload.totalPages,
//         hasNextPage: payload.hasNextPage,
//         nextPage: payload.nextPage,
//         hasPrevPage: payload.hasPrevPage,
//         prevPage: payload.prevPage,
//         pagingCounter: payload.pagingCounter,
//         nick: name,
//         roles : roles
//     })
// }

// export async function getProductId (req,res){
//     let id = req.params.pid
//     const idProducto = await productosDb.getProductById(id)
//     res.send(idProducto )
// }

// export async function postProduct (req,res) {
//     const product = req.body
//     await productosDb.addProduct(product)
//     res.send('ok')
// }

// export async function putProduct (req,res) {
//     let id = req.params.pid
//     const product = req.body
//     const putProduct = await productosDb.updateProduct(id,product)
//     res.send(putProduct)
// }

// export async function deleteProduct (req,res) {
//     let id = req.params.pid
//     const newProduct = await productosDb.deleteProductId(id)
//     res.send(newProduct)
// }