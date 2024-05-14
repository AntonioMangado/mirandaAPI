import express, { Request, Response } from "express";
import { bookings } from "../data/bookings"
import { getBooking, getBookings } from "../services/booking";
const app = express();
export const bookingsControllers = express.Router();

bookingsControllers.get("/bookings", async (req: Request, res: Response): Promise<void>  => {
    const bookings = await getBookings()
    res.json(bookings)
})
bookingsControllers.post("/bookings", (req: Request, res: Response) => {
    res.json({data: bookings})
})

bookingsControllers.get("/booking/:id", async (req: Request, res: Response): Promise<void>  => {
    const id = req.params.id;
    const booking = await getBooking(Number(id))
    res.json(booking)
})

bookingsControllers.patch("/booking/:id", (req: Request, res: Response) => {
    res.json({data: bookings})
})
bookingsControllers.delete("/booking/:id", (req: Request, res: Response) => {
    res.json({data: bookings})
})
