import { reviews } from "../data/reviews"
import { IReview } from "../lib/interfaces"
import Review from "../models/reviews.models"
import { APIError } from "../middleware/error"

export async function getReviews(): Promise<IReview[]> {
    const reviews = await Review.find();
    if (!reviews) {
        throw new APIError("Reviews not found", 404, true)
    }
    return reviews
}

export async function getReview(id: string): Promise<IReview> {
    const review = await Review.findOne({orderId: id.toUpperCase()})
    if (!review) {
        throw new APIError("Review not found", 404, true)
    }
    return review
}