import express, { NextFunction, Request, Response } from "express";
import { staff } from "../data/staff"
import { getStaff, getEmployee } from "../services/staff";
const app = express();
export const staffControllers = express.Router();

staffControllers.get("/staff", async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    try {
        const staff = await getStaff()
        return res.json({data: staff}) 
    } catch (error) {
        next(error)
    }
})

staffControllers.post("/staff", (req: Request, res: Response) => {
    return res.json({data: staff})
})
 
staffControllers.get("/staff/:id", async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    try {
        const id = (req.params.id).toLowerCase();
        const member = await getEmployee(id)
        return res.json(member)
    } catch (error) {
        next(error)
    }
})

staffControllers.patch("/staff/:id", (req: Request, res: Response) => {
    return res.json({data: staff})
})
staffControllers.delete("/staff/:id", (req: Request, res: Response) => {
    return res.json({data: staff})
})