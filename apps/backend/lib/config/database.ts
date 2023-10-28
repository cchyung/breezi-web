import mongoose from "mongoose"
import { logger } from "lib/logger"

const handleConnectionError = (error: Error) => {
	logger.error(error)
}

export const initDatabaseConnection = async () => {
	const url = process.env.MONGO_DB_URL!

	mongoose.connection.once("open", async () => {
		logger.info("connection to mongo successfully established")
	})

	mongoose.connection.on("disconnect", async () => {
		logger.error("mongo connection disconnected")
		await mongoose.connect(url).catch(handleConnectionError)
	})

	mongoose.connection.on("reconnect", async () => {
		logger.info("mongo connection reestablished")
	})

	mongoose.connection.on("error", async (error: Error) => {
		logger.error(error)
	})

	await mongoose.connect(url).catch(handleConnectionError)
}

export const closeDatabaseConnection = async () => {
	await mongoose.disconnect()
}
