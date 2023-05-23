import { ProductDBManager } from '../managers/productDBManager.js'
import { postSesiones } from './sesiones.controller.js'

const productosDb = new ProductDBManager()

export  async function getProductsAll (req,res) {

    let limit = req.query.limit ?? 5
    let page = req.query.page ?? 1
    let query = req.query.query
    let sort = req.query.sort

    let queryList = {limit, page, sort, query}

    const payload = await productosDb.getProductQuery(queryList)
    const name = req.session.user.name
    const roles = req.session.user.roles

    res.render('products', {

        titulo: 'Products', 
        encabezado: 'Lista de Productos',
        hayDocs: payload.docs.length > 0,
        docs: payload.docs,
        limit: payload.limit,
        page: payload.page,
        totalPages: payload.totalPages,
        hasNextPage: payload.hasNextPage,
        nextPage: payload.nextPage,
        hasPrevPage: payload.hasPrevPage,
        prevPage: payload.prevPage,
        pagingCounter: payload.pagingCounter,
        nick: name,
        roles : roles
    })
}

export async function getProductId (req,res){
    let id = req.params.pid
    const idProducto = await productosDb.getProductById(id)
    res.send(idProducto )
}

export async function postProduct (req,res) {
    const product = req.body
    await productosDb.addProduct(product)
    res.send('ok')
}

export async function putProduct (req,res) {
    let id = req.params.pid
    const product = req.body
    const putProduct = await productosDb.updateProduct(id,product)
    res.send(putProduct)
}

export async function deleteProduct (req,res) {
    let id = req.params.pid
    const newProduct = await productosDb.deleteProductId(id)
    res.send(newProduct)
}