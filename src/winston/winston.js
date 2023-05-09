import winston from "winston";
import { config } from "dotenv";

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white',
    }
}

let logger;

if(config.node_env === "development") {
    logger = winston.createLogger({
        levels: customLevelsOptions.levels,
        transports: [
            new winston.transports.Console({
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelsOptions.colors}),
                    winston.format.simple(),
                )
            })
        ]
    })
} else {
    logger = winston.createLogger({
        levels: customLevelsOptions.levels,
        transports: [
            new winston.transports.Console({
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelsOptions.colors}),
                    winston.format.simple(),
                )
            }),
            new winston.transports.File({
                filename: "./errors.log",
                level: "error",
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint()
                )
            })
        ]
    })
}

export default logger;