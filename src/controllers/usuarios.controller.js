import { UsersDbManager } from "../managers/usersDbManager.js"
import { criptografiador } from "../utils/criptografia.js"

const usuariosDB = new UsersDbManager()

export async function postUsuarios(req, res, next) {

    const datosUsuario = req.body
    
    try{
      datosUsuario.password = criptografiador.hashear(datosUsuario.password)
      
      const usuarioGuardado = await usuariosDB.postUsers(datosUsuario)

      const token = criptografiador.generarToken(usuarioGuardado)

      res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })

      req['io'].sockets.emit('usuarios', await usuariosDB.getUsers())

      res.status(201).json(usuarioGuardado)
  
    }
    catch {

    }
  }