import { Schema, model, connect, HydratedDocument, disconnect } from "mongoose";
import { IRoom } from "../lib/interfaces"

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

const roomSchema = new Schema<IRoom>(objectSchema);

const Room = model<IRoom>("Room", roomSchema);

export default Room;

// async function run() {
//     await connect("mongodb://localhost:27017")
//     const testRoom1: HydratedDocument<IRoom> = new Room({
//         image: 'hotel-room.webp',
//         roomNumber: 101,
//         roomID: 'R101',
//         roomType: 'Single Bed',
//         amenities: ['Wi-Fi', 'TV', 'Air Conditioning'],
//         price: 100,
//         offerPrice: 90,
//         status: 'available',
//     })
//     const testRoom2: HydratedDocument<IRoom> = new Room({
//         image: 'hotel-room.webp',
//         roomNumber: 102,
//         roomID: 'R101',
//         roomType: 'Single Bed',
//         amenities: ['Wi-Fi', 'TV', 'Air Conditioning'],
//         price: 100,
//         offerPrice: 90,
//         status: 'available',
//     })
//     const testRoom3: HydratedDocument<IRoom> = new Room({
//         image: 'hotel-room.webp',
//         roomNumber: 103,
//         roomID: 'R101',
//         roomType: 'Single Bed',
//         amenities: ['Wi-Fi', 'TV', 'Air Conditioning'],
//         price: 100,
//         offerPrice: 90,
//         status: 'available',
//     })
//     const roomArray = [testRoom1, testRoom2, testRoom3];
//     await Room.insertMany(roomArray);
//     console.log("Rooms saved");
//     disconnect();
// }

// run().catch(err => console.error(err))