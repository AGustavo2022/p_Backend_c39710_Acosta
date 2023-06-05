import { cartsDaoMongoose } from "../daos/cart.dao.mongoose.js"
import { GenericRepository } from "./generic.repository.js"

export const cartsRepository = new GenericRepository(cartsDaoMongoose)