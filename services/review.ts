import { IReview } from "../lib/interfaces"
import Review from "../models/reviews.models"
import { APIError } from "../middleware/error"
import { connection } from "../config/sqldb"

export async function getReviews() {
    const reviews = await connection.execute(`SELECT * FROM reviews`)
    if (!reviews) {
        throw new APIError("Reviews not found", 404, true)
    }
    return reviews
}

export async function getReview(id: string) {
    try {
        const review = await connection.execute(`SELECT * FROM reviews WHERE review_id = ?`, [id])
            if (!review) {
                throw new APIError("Review not found", 404, true)
            }
            return review
    } catch (err) {
        throw new APIError('Invalid review ID', 400, true)
    }
}

export async function createReview(review: IReview){
    const newReview = await connection.execute(`INSERT INTO reviews (reviewer, review_date, review_text, rating, room_id) VALUES (?, ?, ?, ?, ?)`,
         [review.reviewer, review.review_date, review.review_text, review.rating, review.room_id])
    if (!newReview) {
        throw new APIError("Invalid review format", 422, true)
    }
    return newReview
}

export async function updateReview(id: string, data: IReview) {
    const updatedReview = await connection.execute(`UPDATE reviews SET reviewer = ?, review_date = ?, review_text = ?, rating = ?, room_id = ? WHERE review_id = ?`,
        [data.reviewer, data.review_date, data.review_text, data.rating, data.room_id, id])
    if (!updatedReview) {
        throw new APIError("Review not found", 404, true)
    }
    return updatedReview;
}

export async function deleteReview(id: string) {
    const deletedReview = await connection.execute(`DELETE FROM reviews WHERE review_id = ?`, [id])
    if (!deletedReview) {
        throw new APIError("Booking not found", 404, true)
    }
    return deletedReview
}