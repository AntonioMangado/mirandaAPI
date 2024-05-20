import Booking from "../models/bookings.models"
import { IBooking } from "../lib/interfaces"
import { APIError } from "../middleware/error"

export async function getBookings(): Promise<IBooking[]> {
    const bookings = await Booking.find()
    if (!bookings) {
        throw new APIError("No bookings found", 404, true)
    }
    return bookings
}

export async function getBooking(id: number): Promise<IBooking> {
    const booking = await Booking.findOne({booking_id: id})
    if (!booking) {
        throw new APIError("Booking not found", 404, true)
    }
    return booking
}