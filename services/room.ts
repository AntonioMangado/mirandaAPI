import { rooms } from "../data/rooms"
import { IRoom } from "../lib/interfaces"
import Room from "../models/rooms.models"
import { APIError } from "../middleware/error"

export async function getRooms(): Promise<IRoom[]> {
    const rooms = await Room.find()
    if (!rooms) {
        throw new APIError("Rooms not found", 404, true)
    }
    return rooms
}

export async function getRoom(id: string): Promise<IRoom> {
    const room = await Room.findOne({ roomID: id.toUpperCase() })
    if (!room) {
        throw new APIError("Room not found", 404, true)
    }
    return room
}

export async function createRoom(room: IRoom): Promise<IRoom> {
    const newRoom = new Room(room)
    if (!newRoom) {
        throw new APIError("Invalid room format", 422, true)
    }
    return newRoom.save()
}