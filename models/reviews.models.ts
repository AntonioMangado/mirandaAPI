import mongoose from "mongoose";

const objectSchema = {
    orderId: String,
    date: String,
    customer: String,
    rating: Number,
    comment: String
}

const reviewSchema = new mongoose.Schema(objectSchema);

const Review = mongoose.model("Review", reviewSchema);

export default Review;