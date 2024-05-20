import { Schema, model, connect } from "mongoose";
import { Room } from "../lib/interfaces"

const objectSchema = {
    image: String,
    roomNumber: Number,
    roomID: String,
    roomType: String,
    amenities: [String],
    price: Number,
    offerPrice: Number,
    status: String
}

const roomSchema = new Schema<Room>(objectSchema);

const Room = model<Room>("Room", roomSchema);

export default Room;