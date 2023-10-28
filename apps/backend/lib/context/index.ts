// Stores the base context object passed from the schema to various services in our backend

import { Request, Response } from "express"
import { Database } from "models"
import { User } from "models/user"

export interface UnauthenticatedContext {
	req: Request
	res: Response
	db: Database
}

export interface AuthenticatedContext extends UnauthenticatedContext {
	user: User
	internalAdmin?: boolean
}
