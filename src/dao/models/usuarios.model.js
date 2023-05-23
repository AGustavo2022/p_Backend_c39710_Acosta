import mongoose, { Schema } from 'mongoose'

const usersCollection = "users"

const schemaUsers = new Schema({
    email: { type: String, required: true, unique:true},
    name: { type: String, required: true},
    lastname: { type: String, required: true},
    password: { type: String, required: true},
    rol: { type: String, enum: ['user', 'admin'], default: 'user' }
    
}, { versionKey: false })

export const usersModel = mongoose.model(usersCollection, schemaUsers)