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
    try {
        const room = await Room.findOne({ _id: id })
            if (!room) {
                throw new APIError("Room not found", 404, true)
            }
            return room 
    } catch (err) {
        throw new APIError('Invalid room ID', 400, true)
    }
}

export async function createRoom(room: IRoom): Promise<IRoom> {
    const newRoom = new Room(room)
    const savedRoom = await newRoom.save()
    console.log(savedRoom)
    // if (!newRoom) {
    //     throw new APIError("Invalid room format", 422, true)
    // }
    return savedRoom
}

export async function updateRoom(id: string, data: IRoom): Promise<IRoom> {
    const updatedRoom = await Room.findOneAndUpdate({_id: id}, data, {returnDocument: "after"});
    if (!updatedRoom) {
        throw new APIError("Room not found", 404, true)
    }
    return updatedRoom;
}

export async function deleteRoom(id: string): Promise<IRoom> {
    const deletedRoom = await Room.findByIdAndDelete({_id: id});
    if (!deletedRoom) {
        throw new APIError("Room not found", 404, true)
    }
    return deletedRoom
}