import { reviews } from "../data/reviews"
import { Review } from "../lib/interfaces"

export async function getReviews(): Promise<Review[]> {
    return reviews
}

export async function getReview(id: string): Promise<Review> {
    const review = reviews.find(review => (review.orderId).toLowerCase() === id)
    if (!review) {
        throw new Error("Review not found")
    }
    return review
}