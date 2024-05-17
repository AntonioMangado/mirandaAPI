import express, { NextFunction, Request, Response } from "express";
import { reviews } from "../data/reviews"
import { getReviews, getReview } from "../services/review";
const app = express();
export const reviewsControllers = express.Router();

reviewsControllers.get("/reviews", async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    try {
        const reviews = await getReviews()
        return res.json({data: reviews})
    } catch (error) {
        next(error);
    }
})

reviewsControllers.post("/reviews", (req: Request, res: Response) => {
    return res.json({data: reviews})
})

reviewsControllers.get("/review/:id", async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    try {
        const id = (req.params.id).toLowerCase();
        const review = await getReview(id)
        return res.json(review)
    } catch (error) {
        next(error)
    }
})

reviewsControllers.patch("/review/:id", (req: Request, res: Response) => {
    return res.json({data: reviews})
})
reviewsControllers.delete("/review/:id", (req: Request, res: Response) => {
    return res.json({data: reviews})
})
