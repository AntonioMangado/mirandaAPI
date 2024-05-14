import { rooms } from "../data/rooms"
import { Room } from "../lib/interfaces"

export async function getRooms(): Promise<Room[]> {
    return rooms
}

export async function getRoom(id: string): Promise<Room> {
    const room = rooms.find(room => (room.roomID).toLowerCase() === id)
    if (!room) {
        throw new Error("Room not found")
    }
    return room
}