import express, { Request, Response } from "express";
import { rooms } from "../data/rooms"
const app = express();
const router = express.Router();

router.get("/rooms", (req: Request, res: Response) => {
    res.json({data: rooms})
})
router.post("/rooms", (req: Request, res: Response) => {
    res.json({data: rooms})
})

router.get("/room/:id", (req: Request, res: Response) => {
    const id = (req.params.id).toLowerCase();
    const room = rooms.find(room => (room.roomID).toLowerCase() === id)
    room 
        ? res.json(room)
        : res.status(404).json({message: "Room not found"})
})

router.patch("/room/:id", (req: Request, res: Response) => {
    res.json({data: rooms})
})
router.delete("/room/:id", (req: Request, res: Response) => {
    res.json({data: rooms})
})


module.exports = router;