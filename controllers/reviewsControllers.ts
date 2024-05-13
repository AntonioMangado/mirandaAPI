import express, { Request, Response } from "express";
import { reviews } from "../data/reviews"
const app = express();
const router = express.Router();

router.get("/reviews", (req: Request, res: Response) => {
    res.json({data: reviews})
})
router.post("/reviews", (req: Request, res: Response) => {
    res.json({data: reviews})
})

router.get("/review/:id", (req: Request, res: Response) => {
    const id = (req.params.id).toLowerCase();
    const review = reviews.find(review => (review.orderId).toLowerCase() === id)
    review 
        ? res.json(review)
        : res.status(404).json({message: "review not found"})
})

router.patch("/review/:id", (req: Request, res: Response) => {
    res.json({data: reviews})
})
router.delete("/review/:id", (req: Request, res: Response) => {
    res.json({data: reviews})
})


module.exports = router;