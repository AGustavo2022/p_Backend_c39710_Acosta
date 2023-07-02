import { cartsService } from '../services/carts.services.js'


export async function handleGet(req, res, next) {
  const cid = req.params.id
  try {
    const buscado = await cartsService.getCarts(cid)
    res.json(buscado)
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  const cart = req.body
  try {
    const creada = await cartsService.postCarts(cart)
    res.status(201).json(creada)
  } catch (error) {
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  const cart = req.params.id
  try {
    const deleteCart = await cartsService.deleteCart(cart)
    res.json(deleteCart)
  } catch (error) {
    next(error)
  }
}

//revisar funcionalidad handlePut
export async function handlePut(req, res, next) {
  const cid = req.params.id
  const updatedCart = req.body
  try {
    const updated = await cartsService.putCart(cid, updatedCart)
    res.json(updated)
  } catch (error) {
    next(error)
  }
}
/***********/

export async function handlePostProduct(req, res, next) {
  try {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const agregado = await cartsService.agregarAlCarrito(idCart, idProduct)
    res.status(201).json(agregado)
  } catch (error) {
    next(error)
  }
}

