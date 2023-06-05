import { Carts } from '../models/carts.models.js'
import { cartsRepository } from '../repositories/carts.repository.js'
import { cartsService } from '../services/carts.services.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const buscado = await cartsRepository.readOne({ id: req.params.id })
      res.json(buscado)
    } else {
      const ordenes = await cartsRepository.readMany(req.query)
      res.json(ordenes)
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const cart = new Carts(req.body)
    const creada = await cartsRepository.create(cart.dto())
    res.status(201).json(creada)
  } catch (error) {
    next(error)
  }
}

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

export async function handleDelete(req, res, next) {
  try {
    const borrado = await cartsRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) {
    next(error)
  }
}

// export async function handlePut(req, res, next) {
//   try {
//     const actualizado = await cartsRepository.updateOne(req.params.id, req.body)
//     res.json(actualizado)
//   } catch (error) {
//     next(error)
//   }
// }
