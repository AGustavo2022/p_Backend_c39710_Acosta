import { ProductDBManager } from '../dao/productDBManager.js'

const productosDb = new ProductDBManager()

export const getProductsAll = async (req,res)=>{

    let limit = req.query.limit ?? 5
    let page = req.query.page ?? 1
    let query = req.query.query
    let sort = req.query.sort

    let queryList = {limit, page, sort, query}

    const payload = await productosDb.getProductQuery(queryList)
    console.log(payload)
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
    })
}

export const getProductId =  async (req,res)=>{
    let id = req.params.pid
    const idProducto = await productosDb.getProductById(id)
    res.send(idProducto )
}

export const postProduct = async (req,res)=>{
    const product = req.body
    await productosDb.addProduct(product)
    res.send('ok')
}

export const putProduct = async (req,res)=>{
    let id = req.params.pid
    const product = req.body
    const putProduct = await productosDb.updateProduct(id,product)
    res.send(putProduct)
}

export const deleteProduct =  async (req,res)=>{
    let id = req.params.pid
    const newProduct = await productosDb.deleteProductId(id)
    res.send(newProduct)
}