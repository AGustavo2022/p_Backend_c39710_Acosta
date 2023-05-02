import mongoose, { Schema } from 'mongoose'

const usersCollection = "users"

const schemaUsers = new Schema({
    email: { type: String, required: true, unique:true},
    nick: { type: String, required: true},
    password: { type: String, required: true} 
    
}, { versionKey: false })

export const usersModel = mongoose.model(usersCollection, schemaUsers)