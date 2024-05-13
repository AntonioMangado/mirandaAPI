import express, { Request, Response } from "express";
import { bookings } from "../data/bookings"
const app = express();
const router = express.Router();

router.get("/bookings", (req: Request, res: Response) => {
    res.json({data: bookings})
})
router.post("/bookings", (req: Request, res: Response) => {
    res.json({data: bookings})
})

router.get("/booking/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const booking = bookings.find(booking => (booking.booking_id) === Number(id))
    booking 
        ? res.json(booking)
        : res.status(404).json({message: "Booking not found"})
})

router.patch("/booking/:id", (req: Request, res: Response) => {
    res.json({data: bookings})
})
router.delete("/booking/:id", (req: Request, res: Response) => {
    res.json({data: bookings})
})


module.exports = router;