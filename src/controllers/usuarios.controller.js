import { usersModel } from "../dao/models/usuarios.model.js"

export async function postUsuarios(req, res, next) {
    console.log(req.body)
    const usuarioCreado = await usersModel.create(req.body)
  
    req.session.user = {
      name: usuarioCreado.nick,
      email: usuarioCreado.email
    }
  
    res.status(201).json(usuarioCreado)
  }