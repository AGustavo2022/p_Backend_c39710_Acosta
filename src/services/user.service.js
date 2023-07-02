import { User } from "../models/user.models.js"
import { usuariosRepository } from "../repositories/user.repository.js"
import { criptografiador } from "../utils/criptografia.js"



class UserService {

    constructor() {}

    async getUser (uid) {
        if (uid != undefined){
            const buscado = await usuariosRepository.readOne ({ id: uid })
            return buscado
        }else{
            const users = await usuariosRepository.readMany()
            return users
        }
    }

    async postUser (user) {
        
        const datosUsuarioBody = new User(user)

        const datosUsuarios = datosUsuarioBody.dto()

        datosUsuarios.password = criptografiador.hashear(datosUsuarios.password)
        
        datosUsuarios.cart = "test"
  
        const usuarioGuardado = await usuariosRepository.create(datosUsuarios)

        return usuarioGuardado
    }
}

export const usersService = new UserService()

