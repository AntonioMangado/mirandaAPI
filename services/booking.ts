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

export async function getBooking(id: string): Promise<IBooking> {
    try {
        const booking = await Booking.findOne({_id: id})
            if (!booking) {
                throw new APIError("Booking not found", 404, true)
            }
            return booking
    } catch (err) {
        throw new APIError('Invalid booking ID', 400, true)
    }   
}

export async function createBooking(booking: IBooking): Promise<IBooking> {
    const newBooking = new Booking(booking)
    if (!newBooking) {
        throw new APIError("Invalid booking format", 422, true)
    }
    return newBooking.save()
}

export async function updateBooking(id: string, data: IBooking): Promise<IBooking> {
    const updatedBooking = await Booking.findOneAndUpdate({_id: id}, data, {returnDocument: "after"});
    if (!updatedBooking) {
        throw new APIError("Booking not found", 404, true)
    }
    console.log(updatedBooking)
    return updatedBooking;
}

export async function deleteBooking(id: string): Promise<IBooking> {
    const deletedBooking = await Booking.findByIdAndDelete({_id: id});
    if (!deletedBooking) {
        throw new APIError("Booking not found", 404, true)
    }
    return deletedBooking
}