import express, { NextFunction, Request, Response } from "express";
import { loginUser, createAdmin } from "../services/login";
export const loginControllers = express.Router();

loginControllers.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    try {
        const result = await loginUser(req.body)
        return res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

loginControllers.post("/admin", async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    try {
        const result = await createAdmin(req.body)
        return res.status(201).json(result)
    } catch (err) {
        next(err)
    }
})