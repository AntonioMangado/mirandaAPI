import express, { Request, Response } from "express";
import { staff } from "../data/staff"
import { getStaff, getEmployee } from "../services/staff";
const app = express();
export const staffControllers = express.Router();

staffControllers.get("/staff", async (req: Request, res: Response) => {
    const staff = await getStaff()
    res.json({data: staff})
})
staffControllers.post("/staff", (req: Request, res: Response) => {
    res.json({data: staff})
})
 
staffControllers.get("/staff/:id", async (req: Request, res: Response) => {
    const id = (req.params.id).toLowerCase();
    const member = await getEmployee(id)
    res.json(member)
})

staffControllers.patch("/staff/:id", (req: Request, res: Response) => {
    res.json({data: staff})
})
staffControllers.delete("/staff/:id", (req: Request, res: Response) => {
    res.json({data: staff})
})