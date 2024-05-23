import express, { NextFunction, Request, Response } from "express";
import { getStaff, getEmployee, createEmployee, updateStaff, deleteStaff } from "../services/staff";
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

staffControllers.post("/staff", async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    try {
        const employee = req.body
        const newEmployee = await createEmployee(employee)
        return res.json({ data: newEmployee })
    } catch (error) {
        next(error)
    }
})
 
staffControllers.get("/staff/:id", async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    try {
        const id = (req.params.id).toLowerCase();
        const member = await getEmployee(id)
        return res.json({data: member})
    } catch (error) {
        next(error)
    }
})

staffControllers.patch("/staff/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedStaff = await updateStaff(id, data)
        return res.json({data: updatedStaff})
    } catch (error) {
        next(error)
    }
})
staffControllers.delete("/staff/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const deletedStaff = await deleteStaff(id)
        return res.json({data: deletedStaff})
    } catch (error) {
        next(error)
    }
})