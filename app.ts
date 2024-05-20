import dotenv from "dotenv";
dotenv.config();
require ("./config/mongodb")
import express, { NextFunction, Request, Response } from "express";
import { roomControllers } from "./controllers/roomControllers";
import { bookingsControllers } from "./controllers/bookingsControllers";
import { reviewsControllers } from "./controllers/reviewsControllers";
import { staffControllers } from "./controllers/staffControllers";
import { loginControllers } from "./controllers/loginControllers";
import { verifyToken } from "./middleware/verifyToken";
import { IAPIError } from "./lib/interfaces";
import { APIError } from "./middleware/error";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Miranda Hotel API<br/> Available endpoints:<br/> /home<br/> /rooms<br/> /room/:id<br/> /reviews<br/> /review/:id <br/> /staff<br/> /staff/:id<br/> /bookings<br/> /booking/:id<br/>")
})
app.use("/", loginControllers);

app.use("/", verifyToken, roomControllers);
app.use("/", verifyToken, bookingsControllers);
app.use("/", verifyToken, reviewsControllers);
app.use("/", verifyToken, staffControllers);

// error 404
app.get("*", (req: Request, res: Response) => {
    throw new APIError("Gatito triste, page not found.", 404,  true)
})

// error handler 
app.use((err: IAPIError, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    return res.status(err.status ?? 500).json({error: true, message: err.safe ? err.message : "Internal server error"})
})



