import { Schema, model, connect, HydratedDocument, disconnect } from "mongoose";
import { IReview } from "../lib/interfaces"

const objectSchema = {
    orderId: String,
    date: String,
    customer: String,
    rating: Number,
    comment: String
}

const reviewSchema = new Schema<IReview>(objectSchema);

const Review = model<IReview>("Review", reviewSchema);

export default Review;

// async function run() {
//     await connect("mongodb://localhost:27017")
//     const testReview1: HydratedDocument<IReview> = new Review({
//         orderId: "ORD001",
//         date: "2024-04-01",
//         customer: "John Doe",
//         rating: 5,
//         comment: "Excellent hotel with great service and amenities. The staff was very friendly and helpful, and the room was clean and comfortable."
//     })
//     const testReview2: HydratedDocument<IReview> = new Review({
//         orderId: "ORD002",
//         date: "2024-04-01",
//         customer: "John Doe",
//         rating: 5,
//         comment: "Excellent hotel with great service and amenities. The staff was very friendly and helpful, and the room was clean and comfortable."
//     })
//     const testReview3: HydratedDocument<IReview> = new Review({
//         orderId: "ORD003",
//         date: "2024-04-01",
//         customer: "John Doe",
//         rating: 5,
//         comment: "Excellent hotel with great service and amenities. The staff was very friendly and helpful, and the room was clean and comfortable."
//     })
//     const reviewArray = [testReview1, testReview2, testReview3];
//     await Review.insertMany(reviewArray);
//     console.log("Reviews saved");
//     disconnect();
// }

// run().catch(err => console.error(err))