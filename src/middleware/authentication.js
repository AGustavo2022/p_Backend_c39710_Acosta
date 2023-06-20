//import { usuariosRepository } from "../repositories/user.repository.js";
import {
  criptografiador
} from "../utils/criptografia.js"


export function extraerToken(req, res, next) {
  req['accessToken'] = req.signedCookies['authToken']
  next()
}

export async function isAuthenticated(req, res, next) {

  if (!req['accessToken']) {
    return res.status(401).json({
      error: 'not authenticated'
    })
  }

  try {
    const payload = await criptografiador.decodificarToken(req['accessToken'])
    req.user = payload
    next()
  } catch (error) {
    res.status(401).json({
      error: 'authentication failed'
    })
  }
}

export function isAdmin(req, res, next) {
  console.log(req.user.role === 'admin')
  req.user.role === 'admin'? next():res.status(403).json({error: 'not authorized. only logged in users allowed'})
}



// async function getCurrentUser (req, res, next) {
//   const token = req.signedCookies.jwt_authorization

//   const user = await verifyToken(token)

//   const userData = {
//     email: user.email,
//     cartID: user.cartID,
//     role: user.role,
//     first_name: user.first_name,
//     last_name: user.last_name,
//     age: user.age
//   }

//   res.json({ user: userData })
// }