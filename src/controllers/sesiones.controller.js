import { sessionService } from "../services/session.service.js"
import { criptografiador } from "../utils/criptografia.js"

export async function handlePost(req, res, next) {

    const email = req.body.email
    const password = req.body.password

    try {
      const usuarioEncontrado = await sessionService.postSession(email, password)

      const access_token = criptografiador.generarToken(usuarioEncontrado)

      res.cookie('authToken', access_token, {
        httpOnly: true,
        signed: true,
        maxAge: 1000 * 60 * 60 * 24
      })

      res.status(201).json(usuarioEncontrado)

    } catch (error) {
      next(error)
    }

}

export async function handleDelete(req, res, next) {
  res.clearCookie('authToken', {
    signed: true,
    httpOnly: true
  })
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
