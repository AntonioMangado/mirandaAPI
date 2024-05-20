import mongoose from "mongoose";

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

const roomSchema = new mongoose.Schema(objectSchema);

const Room = mongoose.model("Room", roomSchema);

export default Room;