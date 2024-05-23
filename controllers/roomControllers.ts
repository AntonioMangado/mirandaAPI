import express, { NextFunction, Request, Response } from "express";
import { getRoom, getRooms, createRoom, updateRoom, deleteRoom } from "../services/room"
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
roomControllers.post("/rooms", async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const room = req.body
        const newRoom = await createRoom(room)
        return res.json({ data: newRoom })
    } catch (error) {
        next(error)
    }
})

roomControllers.get("/room/:id", async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id = (req.params.id).toLowerCase();
        const room = await getRoom(id)
        return res.json({data: room})
    } catch (error) {
        next(error)
    }
})

roomControllers.patch("/room/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedRoom = await updateRoom(id, data)
        return res.json({data: updatedRoom})
    } catch (error) {
        next(error)
    }
})
roomControllers.delete("/room/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const deletedRoom = await deleteRoom(id)
        return res.json({data: deletedRoom})
    } catch (error) {
        next(error)
    }
})
