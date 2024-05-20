import express, { NextFunction, Request, Response } from "express";
import { bookings } from "../data/bookings"
import { getBooking, getBookings, createBooking } from "../services/booking";
export const bookingsControllers = express.Router();

bookingsControllers.get("/bookings", async (req: Request, res: Response, next: NextFunction): Promise<Response | void>  => {
    try {
        const bookings = await getBookings()
        return res.json({data: bookings})
    } catch (error) {
        next(error)
    }
})
bookingsControllers.post("/bookings", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = req.body
        const newBooking = await createBooking(booking)
        return res.json({ data: newBooking})
    } catch (error) {
        next(error)
    }
})

bookingsControllers.get("/booking/:id", async (req: Request, res: Response, next: NextFunction): Promise<Response | void>  => {
    try {
        const id = req.params.id;
        const booking = await getBooking(Number(id))
        return res.json(booking)
    } catch (error) {
        next(error)
    }
})

bookingsControllers.patch("/booking/:id", (req: Request, res: Response) => {
    return res.json({data: bookings})
})
bookingsControllers.delete("/booking/:id", (req: Request, res: Response) => {
    return res.json({data: bookings})
})
