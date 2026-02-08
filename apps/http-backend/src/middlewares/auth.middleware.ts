import { NextFunction, Request, Response } from "express";
import { dependencies } from "@repo/backend-common/backend-common";
import { JwtPayload } from "jsonwebtoken";
const { jwt } = dependencies;


export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization'] || " ";
        if (!token) return res.status(401).json({ message: "Token Absent" })


        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload;
    

        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Failed to decode the token..." })
    }
}