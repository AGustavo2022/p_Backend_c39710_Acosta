import { newId } from "../utils/id.js"

export class Carts {

    #id
    #products

    constructor({
        id = newId(), 
        products = []
        }) {
            this.#id = id
            this.#products = products

    }

    dto() {
        return{
            id: this.#id,
            products: this.#products, 
        }
    }
}