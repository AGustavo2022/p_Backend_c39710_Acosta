import { cartsDaoMongoose, cartsModel } from '../daos/cart.dao.mongoose.js'
import { productosDaoMongoose } from '../daos/product.dao.mongoose.js'
import { cartsRepository } from '../repositories/carts.repository.js'
import { criptografiador } from '../utils/criptografia.js'


export async function handleLogin(req, res, next) {
    res.render('login', {
        titulo: 'Login'
    })
}

export async function handleRegister(req, res, next) {
    res.render('registrate', {
        titulo: 'Registro'
    })
}

export async function handleProducts(req, res, next) {

    let limit = req.query.limit ?? 5
    let page = req.query.page ?? 1
    let query = req.query.query
    let sort = req.query.sort

    const criterioDeBusqueda = {
        query
    }
    const opcionesDePaginacion = {
        limit,
        page,
        sort,
        lean: true 
    }

    const payload = await productosDaoMongoose.paginateMongoose(criterioDeBusqueda,opcionesDePaginacion)

    const userDate = await criptografiador.decodificarToken(req['accessToken'])

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
        nick: userDate.first_name,
        role: userDate.role
    })

}

export async function handleCarts(req, res, next) {

    const query = req.params.id
    const myCart = await cartsRepository.readOne(query)

  

    const myCart2 = await cartsModel.findOne(query).populate('productsCart')

    //myCart2.populate('products')


    // res.render('carts', {
    //     titulo: 'Cart'
    // })

    res.json(myCart2)

}