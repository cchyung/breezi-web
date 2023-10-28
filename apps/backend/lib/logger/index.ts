import winston from "winston"

const transports = {
	console: new winston.transports.Console({ level: "info" }),
	file: new winston.transports.File({ filename: "logs/combined.log", level: "error" }),
}

export const logger = winston.createLogger({
	transports: [transports.console, transports.file],
	format: winston.format.combine(
		winston.format.errors({ stack: true }),
		winston.format.colorize(),
		winston.format.simple()
	),
})
