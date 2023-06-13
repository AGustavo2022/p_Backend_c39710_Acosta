
export function soloAutenticados(req, res, next) {
    if (req.session.user) {
      next()
    } else {
      res.redirect('/register')
    }
  }


  export function soloAdministradores(req, res, next) {
    if (req.session.user.role === 'user') {
      next()
    } else {
      res.status(403).json({ error: 'Acceso denegado' })
    }
  }