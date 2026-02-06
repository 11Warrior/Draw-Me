import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request{
    userId: string
}

export const protectRoute = (req: AuthRequest, res: Response, next: NextFunction)  => {
    const token = req.headers['authorization'] || " ";

    if (!token) return res.status(401).json({ message: "Token Absent" })

    try {
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET!) as JwtPayload;
        req.userId = decoded.userId;
        
        next();

    } catch (error) {
        return res.status(401).json({ message: "Failed to decode the token..." })
    }

}