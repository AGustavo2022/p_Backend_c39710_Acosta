import { newId } from "../utils/id.js"

export class User {

  #id
  #first_name
  #last_name
  #email
  #age
  #password
  #cart
  #role

  constructor({
      id = newId(),
      first_name,
      last_name,
      email,
      age,
      password,
      cart,
      role

    }) {
    this.#id = id
    this.#first_name = first_name
    this.#last_name = last_name
    this.#email = email
    this.#age = age
    this.#password = password
    this.#cart = cart
    this.#role = role
  }

  dto() {
    return{
        id: this.#id,
        first_name: this.#first_name, 
        last_name: this.#last_name,
        email: this.#email,
        age: this.#age,
        password: this.#password,
        cart: this.#cart, 
        role:  this.#role
    }
}
}