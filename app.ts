import express, { Request, Response } from "express";
const app = express();
const port = 4000;
const roomControllers = require("./controllers/roomControllers");
const bookingsControllers = require("./controllers/bookingsControllers");
const reviewsControllers = require("./controllers/reviewsControllers");
const staffControllers = require("./controllers/staffControllers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req: Request, res: Response) => {
    res.send("Miranda Hotel API\n Available routes: \n /home \n /rooms \n /room/:id \n /reviews \n /staff \n /bookings")
})

app.use("/", roomControllers);
app.use("/", bookingsControllers);
app.use("/", reviewsControllers);
app.use("/", staffControllers);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})