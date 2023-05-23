import { usersModel} from '../dao/models/usuarios.model.js'
import { User } from '../classes/user.classes.js'


export class UsersDbManager {

    constructor () {
        this.usersDb = usersModel
    }

    async getUsers() {
        const usersDb = await this.usersDb.find().lean()
        return usersDb
    }

    async getUsersId(id) {
        const usuario = await this.usersDb.findById(id).lean()
        if (!usuario) throw new Error('NOT FOUND')
        return usuario
    }

    async getUsersEmail(email) {
        const usuario = await this.usersDb.findOne({email}).lean()
        if (!usuario) throw new Error('NOT FOUND')
        return usuario
    }

    async postUsers(usuario) {
        let usuarioGuardado = await this.usersDb.create(usuario)
        usuarioGuardado = JSON.parse(JSON.stringify(usuarioGuardado))
        return usuarioGuardado
    }
}