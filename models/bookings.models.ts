import { Schema, model, connect, disconnect, HydratedDocument } from "mongoose";
import { IBooking } from "../lib/interfaces"
require("../config/mongodb")

const objectSchema = {
    guest: {
        name: String,
        surname: String,
    },
    booking_id: Number,
    order_date: String,
    check_in: String,
    check_out: String,
    special_request: {type: String, default: null},
    room_type: String,
    roomID: String,
    status: String
}

const bookingSchema = new Schema<IBooking>(objectSchema);

const Booking = model<IBooking>("Booking", bookingSchema);

export default Booking;

// async function run() {
//     await connect("mongodb://localhost:27017")
//     const testBooking1: HydratedDocument<IBooking> = new Booking({
//             guest: {
//               name: "John",
//               surname: "Doe"
//             },
//             booking_id: 1,
//             order_date: "2024-04-17",
//             check_in: "2024-05-01",
//             check_out: "2024-05-05",
//             special_request: "Non-smoking room",
//             room_type: "Single Bed",
//             roomID: 'R101',
//             status: "Check In"
//     })
//     const testBooking2: HydratedDocument<IBooking> = new Booking({
//             guest: {
//               name: "Jane",
//               surname: "Doe"
//             },
//             booking_id: 3,
//             order_date: "2024-04-17",
//             check_in: "2024-05-01",
//             check_out: "2024-05-05",
//             special_request: "Non-smoking room",
//             room_type: "Single Bed",
//             roomID: 'R101',
//             status: "Check In"
//     })
//     const testBooking3: HydratedDocument<IBooking> = new Booking({
//             guest: {
//               name: "Jimmy",
//               surname: "Doe"
//             },
//             booking_id: 2,
//             order_date: "2024-04-17",
//             check_in: "2024-05-01",
//             check_out: "2024-05-05",
//             special_request: "Non-smoking room",
//             room_type: "Single Bed",
//             roomID: 'R101',
//             status: "Check In"
//     })
//     const bookingArray = [testBooking1, testBooking2, testBooking3];
//     await Booking.insertMany(bookingArray);
//     console.log("Bookings saved");
//     disconnect();
// }

// run().catch(err => console.error(err))