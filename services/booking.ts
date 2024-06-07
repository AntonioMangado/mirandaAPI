import Booking from "../models/bookings.models"
import { IBooking } from "../lib/interfaces"
import { APIError } from "../middleware/error"
import { connection } from "../config/sqldb"

export async function getBookings() {
    const bookings = await connection.execute(`SELECT * FROM bookings`)
    if (!bookings) {
        throw new APIError("No bookings found", 404, true)
    }
    return bookings
}

export async function getBooking(id: string) {
    try {
        const booking = await connection.execute(`SELECT * FROM bookings WHERE booking_id = ?`, [id])
            if (!booking) {
                throw new APIError("Booking not found", 404, true)
            }
            return booking
    } catch (err) {
        throw new APIError('Invalid booking ID', 400, true)
    }   
}

export async function createBooking(booking: IBooking) {
    const newBooking = await connection.execute(`INSERT INTO bookings (guest, order_date, check_in, check_out, room_type, room_id, status, special_request) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
         [booking.guest, booking.order_date, booking.check_in, booking.check_out, booking.room_type, booking.room_id, booking.status, booking.special_request])
    if (!newBooking) {
        throw new APIError("Invalid booking format", 422, true)
    }
    return newBooking
}

export async function updateBooking(id: string, data: IBooking){
    const updatedBooking = await connection.execute(`UPDATE bookings SET guest = ?, order_date = ?, check_in = ?, check_out = ?, room_type = ?, room_id = ?, status = ?, special_request = ? WHERE booking_id = ?`,
        [data.guest, data.order_date, data.check_in, data.check_out, data.room_type, data.room_id, data.status, data.special_request, id])
    if (!updatedBooking) {
        throw new APIError("Booking not found", 404, true)
    }
    console.log(updatedBooking)
    return updatedBooking;
}

export async function deleteBooking(id: string) {
    const deletedBooking = await connection.execute(`DELETE FROM bookings WHERE booking_id = ?`, [id])
    if (!deletedBooking) {
        throw new APIError("Booking not found", 404, true)
    }
    return deletedBooking
}