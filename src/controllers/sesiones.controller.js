import { usuariosRepository } from "../repositories/user.repository.js"
import { criptografiador } from "../utils/criptografia.js"

export async function handlePost ( req, res, next) {

    const usuarioEncontrado = await usuariosRepository.readOne({ email: req.body.email })

    const passwordBody = criptografiador.comparar(req.body.password,usuarioEncontrado.password)

    if (!usuarioEncontrado) return res.sendStatus(401)
  
    if (passwordBody === false) {
      return res.sendStatus(401)
    }
  
    const usuarioWeb = {
      name: usuarioEncontrado.first_name,
      email: usuarioEncontrado.email,
      role : usuarioEncontrado.role
    }

    const access_token = criptografiador.generarToken(usuarioEncontrado)

    res.cookie('authToken', access_token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })

    res.status(201).json(usuarioEncontrado)

  }
  
  export async function handleDelete (req, res, next) {
    res.clearCookie('authToken', {signed: true,httpOnly: true})
    res.sendStatus(200)
}