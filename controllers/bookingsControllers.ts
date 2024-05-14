import express, { NextFunction, Request, Response } from "express";
import { bookings } from "../data/bookings"
import { getBooking, getBookings } from "../services/booking";
const app = express();
export const bookingsControllers = express.Router();

bookingsControllers.get("/bookings", async (req: Request, res: Response, next: NextFunction): Promise<Response | void>  => {
    try {
        const bookings = await getBookings()
        return res.json(bookings)
    } catch (error) {
        next(error)
    }
})
bookingsControllers.post("/bookings", (req: Request, res: Response) => {
    return res.json({data: bookings})
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
