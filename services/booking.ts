import { bookings } from "../data/bookings"
import { Booking } from "../lib/interfaces"

export async function getBookings(): Promise<Booking[]> {
    return bookings
}

export async function getBooking(id: number): Promise<Booking> {
    const booking = bookings.find(booking => booking.booking_id === id)
    if (!booking) {
        throw new Error("Booking not found")
    }
    return booking
}