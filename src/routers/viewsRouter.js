import { Router } from "express";
import { productModel } from "../dao/models/product.model.js";
import { ProductDBManager } from "../dao/productDBManager.js"

export const viewsRouter = Router()

export const produtcs = new ProductDBManager()

// viewsRouter.get('/',  async (req, res) => {
//     const productslist = await produtcs.getProduct()
//     res.render('products.handlebars', { 
//         titulo: 'Products', 
//         encabezado: 'Lista de Productos', 
//         product: [...productslist],
//         productExist: productslist.length > 0

//      })
// })

viewsRouter.get('/',async (req,res)=>{

    //const criterioDeBusqueda = {}

    // const opcionesDePaginacion = {
    //     limit: req.query.limit ?? 3,
    //     page: req.query.page ?? 1 ,
    //     lean: true 
    // }

    // const result = await productModel.paginate(criterioDeBusqueda, opcionesDePaginacion)
    // console.log(result)

    // result.prevLink = result.hasPrevPage?`http://localhost:8080/students?page=${result.prevPage}`:'';
    // result.nextLink = result.hasNextPage?`http://localhost:8080/students?page=${result.nextPage}`:'';
    // result.isValid= !(page<=0||page>result.totalPages)

    // const context = {
    //     titulo: 'Products', 
    //     encabezado: 'Lista de Productos',
    //     hayDocs: result.docs.length > 0,
    //     docs: result.docs,
    //     limit: result.limit,
    //     page: result.page,
    //     totalPages: result.totalPages,
    //     hasNextPage: result.hasNextPage,
    //     nextPage: result.nextPage,
    //     hasPrevPage: result.hasPrevPage,
    //     prevPage: result.prevPage,
    //     pagingCounter: result.pagingCounter,
    // }

   // res.render('products.handlebars', {})

})   

// viewsRouter.get('/realTimeProducts',  async (req, res) => {
    
//     const productslist = await produtcs.getProduct()
    
//     res.render('realTimeProducts.handlebars', { 
//         titulo: 'RealTimeProducts ', 
//         encabezado: 'Lista de Productos', 
//         product: [...productslist],
//         productExist: productslist.length > 0

        
//      })
// })