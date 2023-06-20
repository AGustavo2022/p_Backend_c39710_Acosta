import { usuariosRepository } from "../repositories/user.repository.js"
import { criptografiador } from "../utils/criptografia.js"

export async function handlePost ( req, res, next) {

    const usuarioEncontrado = await usuariosRepository.readOne({ email: req.body.email })

    const passwordBody = criptografiador.comparar(req.body.password,usuarioEncontrado.password)

    if (!usuarioEncontrado) return res.sendStatus(401)
  
    if (passwordBody === false) {
      return res.sendStatus(401)
    }
    
    const access_token = criptografiador.generarToken(usuarioEncontrado)

    res.cookie('authToken', access_token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })

    res.status(201).json(usuarioEncontrado)

  }
  
  export async function handleDelete (req, res, next) {
    res.clearCookie('authToken', {signed: true,httpOnly: true})
    res.sendStatus(200)
}

export async function handleCurrent (req, res, next) {
  
  const payload = await criptografiador.decodificarToken(req['accessToken'])
  req.user = payload

  const userData = {
    email: payload.email,
    first_name: payload.first_name,
    last_name: payload.last_name,
    age: payload.age,
    role: payload.role
  }

  res.json({userData })
}