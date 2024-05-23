import express, { NextFunction, Request, Response } from "express";
import { getReviews, getReview, createReview, updateReview, deleteReview } from "../services/review";
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

reviewsControllers.post("/reviews",  async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    try {
        const review = req.body
        const newReview = await createReview(review)
        return res.json({data: newReview})
    } catch (error) {
        next(error)
    }
})

reviewsControllers.get("/review/:id", async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    try {
        const id = (req.params.id).toLowerCase();
        const review = await getReview(id)
        return res.json({data: review})
    } catch (error) {
        next(error)
    }
})

reviewsControllers.patch("/review/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedReview = await updateReview(id, data)
        return res.json({data: updatedReview})
    } catch (error) {
        next(error)
    }
})
reviewsControllers.delete("/review/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const deletedReview = await deleteReview(id)
        return res.json({data: deletedReview})
    } catch (error) {
        next(error)
    }
})
