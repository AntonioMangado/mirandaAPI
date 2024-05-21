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
    const review = await Review.findOne({_id: id})
    if (!review) {
        throw new APIError("Review not found", 404, true)
    }
    return review
}

export async function createReview(review: IReview): Promise<IReview> {
    const newReview = new Review(review)
    if (!newReview) {
        throw new APIError("Invalid review format", 422, true)
    }
    return newReview.save()
}

export async function updateReview(id: string, data: IReview): Promise<IReview> {
    const updatedReview = await Review.findOneAndUpdate({_id: id}, data, {returnDocument: "after"});
    if (!updatedReview) {
        throw new APIError("Review not found", 404, true)
    }
    return updatedReview;
}

export async function deleteReview(id: string): Promise<IReview> {
    const deletedReview = await Review.findByIdAndDelete({_id: id});
    if (!deletedReview) {
        throw new APIError("Booking not found", 404, true)
    }
    return deletedReview
}