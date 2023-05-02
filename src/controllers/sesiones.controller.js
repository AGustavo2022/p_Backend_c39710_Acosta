import { usersModel } from "../dao/models/usuarios.model.js"



export async function postSesiones ( req, res, next) {
    console.log(req.body)

    const usuarioEncontrado = await usersModel.findOne({ email: req.body.email }).lean()
    if (!usuarioEncontrado) return res.sendStatus(401)
  
    if (usuarioEncontrado.password !== req.body.password) {
      return res.sendStatus(401)
    }
  
    req.session.user = {
      name: usuarioEncontrado.nick,
      email: usuarioEncontrado.email,
    }
  
    res.status(201).json(req.session.user)
  }
  
  export async function deleteSesiones(req, res, next) {
    req.session.destroy(err => {
      res.sendStatus(200)
    })

}