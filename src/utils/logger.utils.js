import winston  from "winston"
import { format } from 'winston'
import { NODE_ENV } from '../config/servidor.config.js'


export const winstonLoggerDev = winston.createLogger({
    format: format.combine(
      format.simple(),
      format.colorize(),
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)),
    transports: [
      new winston.transports.Console({
        level: "debug",
        
      })
    ]
  })

  const winstonLoggerProd = winston.createLogger({
    format: format.combine(
      format.simple(),
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)),
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