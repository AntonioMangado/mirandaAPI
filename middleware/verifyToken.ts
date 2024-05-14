import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.get("Authorization");
    if (!authHeaders) {
        return res.status(401).json({ error: true, message: "No auth headers present" });
    }

    const token = authHeaders.split("Bearer ")[1];
    try {
        const tokenData = jwt.verify(token, process.env.CLIENT_SECRET as string);
        console.log(tokenData)
        next();
    } catch (error) {
        return res.status(401).json({ error: true, message: "Invalid token" });
    }
}
