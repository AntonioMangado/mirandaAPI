import express, { NextFunction, Request, Response } from "express";
import { rooms } from "../data/rooms"
import { getRoom, getRooms } from "../services/room"
const app = express();
export const roomControllers = express.Router();

roomControllers.get("/rooms", async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const rooms = await getRooms()
        return res.json({data: rooms})
    } catch (error) {
        next(error)
    }
})
roomControllers.post("/rooms", async (req: Request, res: Response): Promise<Response> => {
    return res.json({data: rooms})
})

roomControllers.get("/room/:id", async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id = (req.params.id).toLowerCase();
        const room = await getRoom(id)
        return res.json(room)
    } catch (error) {
        next(error)
    }
})

roomControllers.patch("/room/:id", async (req: Request, res: Response) => {
    return res.json({data: rooms})
})
roomControllers.delete("/room/:id", async (req: Request, res: Response) => {
    return res.json({data: rooms})
})
