import { IRoom } from "../lib/interfaces"
import Room from "../models/rooms.models"
import { APIError } from "../middleware/error"
import { connection } from "../config/sqldb"

export async function getRooms(){
    const rooms = await connection.execute(`SELECT * FROM rooms`)
    if (!rooms) {
        throw new APIError("Rooms not found", 404, true)
    }
    return rooms
}

export async function getRoom(id: string){
    try {
        const room = await connection.execute(`SELECT * FROM rooms WHERE room_id = ?`, [id])
            if (!room) {
                throw new APIError("Room not found", 404, true)
            }
            return room 
    } catch (err) {
        throw new APIError('Invalid room ID', 400, true)
    }
}

export async function createRoom(room: IRoom) {
    const savedRoom = await connection.execute(`INSERT INTO rooms (room_type, room_number, room_rate, room_status) VALUES (?, ?, ?, ?)`,
         [room.room_type, room.room_number, room.room_rate, room.room_status])
    return savedRoom
}

export async function updateRoom(id: string, data: IRoom) {
    const updatedRoom = await connection.execute(`UPDATE rooms SET room_type = ?, room_number = ?, room_rate = ?, room_status = ? WHERE room_id = ?`,
        [data.room_type, data.room_number, data.room_rate, data.room_status, id])
    if (!updatedRoom) {
        throw new APIError("Room not found", 404, true)
    }
    return updatedRoom;
}

export async function deleteRoom(id: string) {
    const deletedRoom = await connection.execute(`DELETE FROM rooms WHERE room_id = ?`, [id])
    if (!deletedRoom) {
        throw new APIError("Room not found", 404, true)
    }
    return deletedRoom
}