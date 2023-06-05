import { userDaoMongoose } from '../daos/user.dao.mongoose.js'
import { GenericRepository } from './generic.repository.js'

export const usuariosRepository = new GenericRepository(userDaoMongoose)