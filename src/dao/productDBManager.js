import { productModel } from "./models/product.model.js"

export class ProductDBManager {

    constructor() {
        this.productsDb = productModel
    }
    
    async getProduct() {
        const productsDb = await this.productsDb.find().lean()
        return productsDb
    }

    async getProductQuery(queryList) {
        const {limit, page, query, sort} = queryList
        const criterioDeBusqueda = {
            query
        }
        const opcionesDePaginacion = {
            limit,
            page,
            sort,
            lean: true 
        }
        if (sort == undefined){
            const result = await productModel.paginate(criterioDeBusqueda, opcionesDePaginacion)
            return result
        }else{
            const opcionesDePaginacion = {
                limit,
                page,
                sort: {price: parseInt(sort)},
                lean: true 
            }
            const result = await productModel.paginate(criterioDeBusqueda, opcionesDePaginacion)
            return result
        }
        
        
    }

    async addProduct (producto) {        
        const productsDb = await this.getProduct()
        const idProducto = productsDb.find(e => e.code == producto.code);
        if (idProducto) {
            throw new Error ('El producto ya existe')
        }  
        await this.productsDb.create(producto)
    }
    
    async getProductById (id) {    
        const productsDb = await this.productsDb.findById(id).lean()    
        return productsDb
    }

    async updateProduct (id,updateProduct) {
        const productsId = await this.productsDb.findById(id).lean()          
        if (productsId == null) {
            throw new Error ('El Id del producto que se quiere actualizar, No existe !!!')
        }
        console.log(updateProduct)
        await this.productsDb.updateOne({_id: id},{$set:updateProduct})
    }
    

    async deleteProductId (id) {
        const indexArr = await this.productsDb.findById(id).lean() 
        if (indexArr == null) {     
                throw new Error ('El Id del producto que se quiere eliminar, No existe !!!')
            }
        await this.productsDb.deleteOne({_id: id})
            
    }
}
