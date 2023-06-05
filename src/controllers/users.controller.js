import { User } from "../models/user.models.js"
import { usuariosRepository } from "../repositories/user.repository.js"
import { criptografiador } from "../utils/criptografia.js"



export async function handleGet(req, res, next) {

  try {
    if (req.params.id) {
      const buscado = await usuariosRepository.readOne({
        id: req.params.id
      })
      res.json(buscado)
    } else {
      const productos = await usuariosRepository.readMany(req.query)
      res.json(productos)
    }
  } catch (error) {
    next(error)
  }

}

export async function handlePost(req, res, next) {


  try{
      const datosUsuario = new User(req.body)
      
    
  
      //usuarioNuevo.password = criptografiador.hashear(usuarioNuevo.password)
      
      const usuarioGuardado = await usuariosRepository.create(datosUsuario.dto())

      // const token = criptografiador.generarToken(usuarioGuardado)

      // res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })

      // req['io'].sockets.emit('usuarios', await usuariosDB.getUsers())

      res.status(201).json(usuarioGuardado)
  
    }
    catch {

    }
  }



  
  // #id
  // #first_name
  // #last_name
  // #email
  // #age
  // #password
  // #cart
  // #role