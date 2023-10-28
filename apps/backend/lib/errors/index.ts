import { AuthenticatedContext, UnauthenticatedContext } from "lib/context"

export class BaseError extends Error {
	public ctx?: AuthenticatedContext | UnauthenticatedContext
	public originalError?: Error | unknown
	public extra?: any

	constructor(
		msg: string,
		options: { ctx?: AuthenticatedContext | UnauthenticatedContext; originalError?: Error | unknown; extra?: any } = {}
	) {
		super(msg)
		// TODO: populate ctx with just user info
		// this.ctx = { user:  }

		this.originalError = options.originalError
		this.extra = options.extra
	}
}

export class SystemError extends BaseError {}

export class AccessError extends BaseError {
	public ctx?: AuthenticatedContext | UnauthenticatedContext
	public originalError?: Error
	public extra?: any
}

export class AuthenticationError extends BaseError {
	public ctx?: AuthenticatedContext | UnauthenticatedContext
	public originalError?: Error
	public extra?: any
}

export class ServiceError extends BaseError {
	public ctx?: AuthenticatedContext | UnauthenticatedContext
	public originalError?: Error
	public extra?: any
}
