import mongoose from "mongoose";

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

const bookingSchema = new mongoose.Schema(objectSchema);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;