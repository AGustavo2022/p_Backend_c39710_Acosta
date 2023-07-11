import winston from 'winston'
import { NODE_ENV } from '../config/servidor.config.js'


const winstonLoggerDev = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
    })
  ]
})

const winstonLoggerProd = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: 'errors.log'
    })
  ]
})

export let winstonLogger

if (NODE_ENV === 'PROD') {
    winstonLogger = winstonLoggerProd
} else {
    winstonLogger = winstonLoggerDev
}

