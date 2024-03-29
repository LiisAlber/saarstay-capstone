import jsonwebtoken from 'jsonwebtoken'
import config from '@server/config'
import { buildAuthenticatedProcedure } from './authProcedure'

const { tokenKey } = config.auth

export const verifyToken = (token: string) => jsonwebtoken.verify(token, tokenKey)

// An example where we provide the dependency.
export const authenticatedProcedure = buildAuthenticatedProcedure(verifyToken)
