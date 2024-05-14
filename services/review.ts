import { reviews } from "../data/reviews"
import { Review } from "../lib/interfaces"
import { APIError } from "../middleware/error"

export async function getReviews(): Promise<Review[]> {
    if (!reviews) {
        throw new APIError("Reviews not found", 404, true)
    }
    return reviews
}

export async function getReview(id: string): Promise<Review> {
    const review = reviews.find(review => (review.orderId).toLowerCase() === id)
    if (!review) {
        throw new APIError("Review not found", 404, true)
    }
    return review
}