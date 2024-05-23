import supertest from 'supertest';
import { app } from '../app';
import Review from '../models/reviews.models';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const token = jwt.sign({email: 'admin@admin.com', username: 'admin'}, process.env.CLIENT_SECRET as string, { expiresIn: "1d" });

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/")
})

describe("GET /reviews", () => {
    it("should return the error message: No auth headers present", async () => {
      const response = await supertest(app).get("/reviews");
      expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })

    it("should returm an object with all the reviews", async () => {
        const reviewResponse = await supertest(app).get("/reviews").set("Authorization", `Bearer ${token}`);
        expect(reviewResponse.status).toBe(200);
        expect(reviewResponse.body.data).toBeInstanceOf(Array);
    })
})

describe("GET /review/:id", () => {
    it("should return the error message: No auth headers present", async () => {
      const response = await supertest(app).get("/review/25");
      expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })

    it("should return an object with the appropiate review", async () => {
        const reviewResponse = await supertest(app).get("/review/664ef65cfe6dee2f9bf775ed").set("Authorization", `Bearer ${token}`);
        expect(reviewResponse.body.data._id).toBeDefined();
        expect(reviewResponse.body.data._id).toBe('664ef65cfe6dee2f9bf775ed');
        expect(reviewResponse.body.data).toBeInstanceOf(Object);
    })

    it("should return the error message 'Review not found' when looking for inexistent id", async () => {
        const reviewResponse = await supertest(app).get("/review/256").set("Authorization", `Bearer ${token}`);
        expect(reviewResponse.status).toEqual(400);
        expect(reviewResponse.body).toEqual({error: true, message: "Invalid review ID"});
    })
})

describe('POST /booking', () => {
    const testReview = {
        date: "2024-04-01",
        customer: "John Doe",
        rating: 5,
        comment: "TEST"
    };
    it('should return the error message: No auth headers present', async () => {
        const response = await supertest(app).post('/reviews').send(testReview);
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
    it('should add the review to the db', async () => {
        const response = await supertest(app).post('/reviews').set("Authorization", `Bearer ${token}`).send(testReview);
        expect(response.status).toBe(200);
        expect(response.body.data._id).toBeDefined();
        expect(response.body.data.comment).toBe(testReview.comment);
    })
})

describe('PATCH /booking', () => {
    const testReview = {
        date: "2024-04-01",
        customer: "John Doe",
        rating: 5,
        comment: "TEST"
    };
    const updatedReview = {
        date: "2024-04-01",
        customer: "John Doe",
        rating: 5,
        comment: "UPDATED_TEST"
    };
    let review: any;
    beforeEach(async () => {
        review = await new Review(testReview).save();
    })
    afterEach(async () => {
        await Review.findByIdAndDelete(review._id);
    })
    it('should return the error message: No auth headers present', async () => {
        const response = await supertest(app).patch('/reviews').send(testReview);
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
    it('should update the review', async () => {
        const response = await supertest(app).patch(`/review/${review._id}`).set("Authorization", `Bearer ${token}`).send(updatedReview);
        expect(response.status).toBe(200);
        expect(response.body.data.comment).toBe(updatedReview.comment);
    })
})

describe('DELETE /review', () => {
    const testReview = {
        date: "2024-04-01",
        customer: "John Doe",
        rating: 5,
        comment: "TEST"
    }
    let review: any;
    let response: supertest.Response;
    beforeEach(async () => {
        review = await new Review(testReview).save();
        response = await supertest(app).delete(`/review/${review._id}`).set("Authorization", `Bearer ${token}`);
    })
    it('should delete the review', async () => {
        expect(response.status).toBe(200);
        let deletedReview = await Review.findById(review._id)
        expect(deletedReview).toBeNull();
    })
    it('should return the error message: No auth headers present', async () => {
        const response = await supertest(app).delete('/reviews').send(testReview);
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
})

afterAll(async () => {
    await Review.deleteMany({ 'comment': 'TEST'})
    await mongoose.disconnect();
})