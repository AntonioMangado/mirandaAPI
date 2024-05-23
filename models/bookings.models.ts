import { Schema, model, connect, disconnect, HydratedDocument } from "mongoose";
import { IBooking } from "../lib/interfaces"

const objectSchema = {
    guest: {
        type: {
            name: String,
            surname: String,
        },
        required: true
    },
    order_date: {type: String, required: true},
    check_in: {type: String, required: true},
    check_out: {type: String, required: true},
    special_request: {type: String, default: null},
    room_type: {type: String, required: true},
    roomID: {type: String, required: true},
    status: {type: String, required: true},
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