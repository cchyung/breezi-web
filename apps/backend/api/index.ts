export { default as UploadRouter } from "./uploads"
import { Request, Response } from "express"
import { verifyAuthToken } from "lib/auth"

export async function authenticateJWTMiddleware(req: Request, res: Response, next) {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		res.sendStatus(401)
		return next()
	}

	const authToken = authHeader.split(" ")[1]
	const authenticatedUser = await verifyAuthToken(authToken)

	if (!authenticatedUser) {
		res.sendStatus(403)
		return next()
	} else {
		return next()
	}
}
