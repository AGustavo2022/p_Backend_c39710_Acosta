import mongoose, { Schema } from 'mongoose'
import { DaoMongoose } from './daoMongoose.js'


const schemaUsers = new Schema({
    id: { type: String, required: true},
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true, unique:true},
    age: { type: Number, required: true},
    password: { type: String, required: true},
    cart:  { type: String, required: true},
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
    
}, { versionKey: false })


const usersModel = mongoose.model('users', schemaUsers)

export const userDaoMongoose = new DaoMongoose(usersModel)