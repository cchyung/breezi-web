import jwt from "jsonwebtoken"

export const getTokenExp = (token: string) => {
	const decoded = jwt.decode(token) as jwt.JwtPayload
	const exp = decoded.exp
	return exp
}

export const getTokenNbf = (token: string) => {
	const decoded = jwt.decode(token) as jwt.JwtPayload
	const nbf = decoded.nbf
	return nbf
}

// time in seconds
export const isTokenExpiringWithin = (token: string, time = 0) => {
	const exp = getTokenExp(token)
	const nbf = getTokenNbf(token)

	const now = Date.now().valueOf() / 1000

	if (typeof exp !== "undefined" && exp - time < now) {
		return true
	}
	if (typeof nbf !== "undefined" && nbf > now) {
		return true
	}

	return false
}
