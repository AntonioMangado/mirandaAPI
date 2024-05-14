import express, { Request, Response } from "express";
import { roomControllers } from "./controllers/roomControllers";
import { bookingsControllers } from "./controllers/bookingsControllers";
import { reviewsControllers } from "./controllers/reviewsControllers";
import { staffControllers } from "./controllers/staffControllers";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Miranda Hotel API<br/> Available endpoints:<br/> /home<br/> /rooms<br/> /room/:id<br/> /reviews<br/> /review/:id <br/> /staff<br/> /staff/:id<br/> /bookings<br/> /booking/:id<br/>")
})

app.use("/", roomControllers);
app.use("/", bookingsControllers);
app.use("/", reviewsControllers);
app.use("/", staffControllers);
app.get("*", (req: Request, res: Response) => {
    res.status(404).send("El gatito está triste, page not found.")
})

