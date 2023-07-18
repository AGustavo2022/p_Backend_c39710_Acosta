import { format } from 'winston'
import winston from 'winston'
import { NODE_ENV } from '../config/servidor.config.js'

const winstonLoggerDev = winston.createLogger({
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
      //format.colorize(),
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)),
    transports: [
      new winston.transports.File({
        level: "info",
        filename: 'errors.log'
      })
    ]
  })
  

export const logger = (req, res, next) => {
    if (NODE_ENV === 'PROD') {
        req.logger = winstonLoggerProd
    } else {
        req.logger  = winstonLoggerDev
    }
    req.logger.info(`${req.method} en ${req.url}`)
    next()
}
  
  
