import express, { Request, Response } from "express";
import { reviews } from "../data/reviews"
import { getReviews, getReview } from "../services/review";
const app = express();
export const reviewsControllers = express.Router();

reviewsControllers.get("/reviews", async (req: Request, res: Response): Promise<void> => {
    const reviews = await getReviews()
    res.json({data: reviews})
})
reviewsControllers.post("/reviews", (req: Request, res: Response) => {
    res.json({data: reviews})
})

reviewsControllers.get("/review/:id", async (req: Request, res: Response): Promise<void> => {
    const id = (req.params.id).toLowerCase();
    const review = await getReview(id)
    res.json(review)
})

reviewsControllers.patch("/review/:id", (req: Request, res: Response) => {
    res.json({data: reviews})
})
reviewsControllers.delete("/review/:id", (req: Request, res: Response) => {
    res.json({data: reviews})
})
