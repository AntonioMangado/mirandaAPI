import { bookings } from "../data/bookings"
import { Booking } from "../lib/interfaces"
import { APIError } from "../middleware/error"

export async function getBookings(): Promise<Booking[]> {
    if (!bookings) {
        throw new APIError("Bookings not found", 404, true)
    }
    return bookings
}

export async function getBooking(id: number): Promise<Booking> {
    const booking = bookings.find(booking => booking.booking_id === id)
    if (!booking) {
        throw new APIError("Booking not found", 404, true)
    }
    return booking
}