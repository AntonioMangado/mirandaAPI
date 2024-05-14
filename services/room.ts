import { rooms } from "../data/rooms"
import { Room } from "../lib/interfaces"
import { APIError } from "../middleware/error"

export async function getRooms(): Promise<Room[]> {
    if (!rooms) {
        throw new APIError("Rooms not found", 404, true)
    }
    return rooms
}

export async function getRoom(id: string): Promise<Room> {
    const room = rooms.find(room => (room.roomID).toLowerCase() === id)
    if (!room) {
        throw new APIError("Room not found", 404, true)
    }
    return room
}