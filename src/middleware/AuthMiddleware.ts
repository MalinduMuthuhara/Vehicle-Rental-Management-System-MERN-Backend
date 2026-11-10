import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string
        role: 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN'
    }
}

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Access Token Required'
            })
        }

        const token = authHeader.split(' ')[1]
        const jwtSecret = process.env.JWT_SECRET

        if (!token || !jwtSecret) {
            return res.status(401).json({
                message: 'Invalid Authentication'
            })
        }

        const decoded = jwt.verify(token, jwtSecret)

        if (
            typeof decoded === 'string' ||
            !('userId' in decoded) ||
            !('role' in decoded) ||
            typeof decoded.userId !== 'string' ||
            !['CUSTOMER', 'EMPLOYEE', 'ADMIN'].includes(decoded.role as string)
        ) {
            return res.status(401).json({
                message: 'Invalid Token'
            })
        }

        const authenticatedReq = req as AuthenticatedRequest

        authenticatedReq.user = {
            userId: decoded.userId,
            role: decoded.role as 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN'
        }

        next()

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or Expired Token'
        })
    }
}