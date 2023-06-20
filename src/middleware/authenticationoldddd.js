import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { JWT_SECRET } from '../config/auth.config'

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
        let token = null
        if (req && req.signedCookies) {
            token = req.signedCookies['accessToken']
        }
        return token
    }]),
    secretOrKey: JWT_SECRET,
}, async (jwt_payload, done) => {
    try {
        done(null, jwt_payload) // payload es el contenido del token, ya descifrado
    } catch (error) {
        done(error)
    }
}))

export function autenticacionJwtApi(req, res, next) {
    passport.authenticate('jwt', (error, jwt_payload, info) => {
        if (error || !jwt_payload) return next(new ErrorDeAutenticacion())
        req.user = jwt_payload
        next()
    })(req, res, next)
}

export function autenticacionJwtView(req, res, next) {
    passport.authenticate('jwt', (error, jwt_payload) => {
        if (error || !jwt_payload) return res.redirect('/login')
        req.user = jwt_payload
        next()
    })(req, res, next)
}


passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    const buscado = await usersManager.buscarPorEmail(username)
    if (!buscado)
        return done(new ErrorDeAutenticacion())
    if (!validarQueSeanIguales(password, buscado.password))
        return done(new ErrorDeAutenticacion())
    delete buscado.password
    done(null, buscado)
}))

export const passportInitialize = passport.initialize()

export const autenticacionLocal = passport.authenticate('local', { session: false, failWithError: true })