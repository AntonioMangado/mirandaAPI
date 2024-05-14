import express, { Request, Response } from "express";
import { rooms } from "../data/rooms"
import { getRoom, getRooms } from "../services/room"
const app = express();
export const roomControllers = express.Router();

roomControllers.get("/rooms", async (req: Request, res: Response): Promise<void> => {
    const rooms = await getRooms()
    res.json(rooms)
})
roomControllers.post("/rooms", async (req: Request, res: Response): Promise<void> => {
    res.json({data: rooms})
})

roomControllers.get("/room/:id", async (req: Request, res: Response): Promise<void> => {
    const id = (req.params.id).toLowerCase();
    const room = await getRoom(id)
    res.json(room)
})

roomControllers.patch("/room/:id", async (req: Request, res: Response) => {
    res.json({data: rooms})
})
roomControllers.delete("/room/:id", async (req: Request, res: Response) => {
    res.json({data: rooms})
})
