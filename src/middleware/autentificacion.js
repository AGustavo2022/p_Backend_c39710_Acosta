export function soloAutenticados(req, res, next) {
    if (req.session.user) {
      next()
    } else {
      res.redirect('/register')
    }
  }