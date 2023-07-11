const PORT_PROD = parseInt(process.env.PORT_PROD)
const PORT_DEV = parseInt(process.env.PORT_DEV)


export let PORT

if (process.env.NODE_ENV === 'PROD') {
    PORT = PORT_PROD
}else {
    PORT = PORT_DEV
}

export const NODE_ENV = process.env.NODE_ENV || 'DEV'
export const LOG_LEVEL = parseInt(process.env.LOG_LEVEL || '10')