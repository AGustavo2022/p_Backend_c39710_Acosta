import { usuariosRepository } from "../repositories/user.repository.js"
import { criptografiador } from "../utils/criptografia.js"

export async function handlePost ( req, res, next) {

    const usuarioEncontrado = await usuariosRepository.readOne({ email: req.body.email })

    const passwordBody = criptografiador.comparar(req.body.password,usuarioEncontrado.password)

    if (!usuarioEncontrado) return res.sendStatus(401)
  
    if (passwordBody === false) {
      return res.sendStatus(401)
    }
  
    req.session.user = {
      name: usuarioEncontrado.first_name,
      email: usuarioEncontrado.email,
      role : usuarioEncontrado.role
    }
  
    res.status(201).json(req.session.user)
  }
  
  export async function handleDelete (req, res, next) {
    req.session.destroy(err => {
      res.sendStatus(200)
    })

}