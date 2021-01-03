import * as winston from 'winston'; 

// write log messages in JSON format for Cloudwatch log
// @params: loggerName - name of logger
// https://www.npmjs.com/package/winston

export function createLogger(loggerName: string) {
   return winston.createLogger({
       level: 'info', // logging level for transport
       format: winston.format.json(), // logging in JSON format
       defaultMeta: { 
           name: loggerName, // message name for Cloudwatch log
       }, 
       transports: [
           // instantiate new Winston logger instance with Console transport
           // Transport: refer to the storage/output mechanisms used for the logs
           new winston.transports.Console() 
       ]
   }); 
}