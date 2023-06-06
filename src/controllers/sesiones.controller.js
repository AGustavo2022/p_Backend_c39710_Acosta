import { usuariosRepository } from "../repositories/user.repository.js"


export async function handlePost ( req, res, next) {

    const usuarioEncontrado = await usuariosRepository.readOne({ email: req.body.email })
    console.log(usuarioEncontrado)
    if (!usuarioEncontrado) return res.sendStatus(401)
  
    if (usuarioEncontrado.password !== req.body.password) {
      return res.sendStatus(401)
    }
  
    req.session.user = {
      name: usuarioEncontrado.first_name,
      email: usuarioEncontrado.email
    }
  
    res.status(201).json(req.session.user)
  }
  
  export async function handleDelete (req, res, next) {
    req.session.destroy(err => {
      res.sendStatus(200)
    })

}