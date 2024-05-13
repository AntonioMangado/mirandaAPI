import express, { Request, Response } from "express";
import { staff } from "../data/staff"
const app = express();
const router = express.Router();

router.get("/staff", (req: Request, res: Response) => {
    res.json({data: staff})
})
router.post("/staff", (req: Request, res: Response) => {
    res.json({data: staff})
})

router.get("/staff/:id", (req: Request, res: Response) => {
    const id = (req.params.id).toLowerCase();
    const member = staff.find(member => (member.employeeId).toLowerCase() === id)
    member 
        ? res.json(member)
        : res.status(404).json({message: "Staff member not found"})
})

router.patch("/staff/:id", (req: Request, res: Response) => {
    res.json({data: staff})
})
router.delete("/staff/:id", (req: Request, res: Response) => {
    res.json({data: staff})
})


module.exports = router;