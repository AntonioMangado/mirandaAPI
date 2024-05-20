import { Schema, model, connect } from "mongoose";
import { Review } from "../lib/interfaces"

const objectSchema = {
    orderId: String,
    date: String,
    customer: String,
    rating: Number,
    comment: String
}

const reviewSchema = new Schema<Review>(objectSchema);

const Review = model<Review>("Review", reviewSchema);

export default Review;