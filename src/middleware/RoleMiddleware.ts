import { Request, Response, NextFunction } from 'express'

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string
        role: 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN'
    }
}

export const authorizeRoles = (
    ...allowedRoles: ('CUSTOMER' | 'EMPLOYEE' | 'ADMIN')[]
) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const authenticatedReq = req as AuthenticatedRequest

        if (!authenticatedReq.user) {
            return res.status(401).json({
                message: 'Please Login First'
            })
        }

        if (!allowedRoles.includes(authenticatedReq.user.role)) {
            return res.status(403).json({
                message: 'You Do Not Have Permission'
            })
        }

        next()
    }
}