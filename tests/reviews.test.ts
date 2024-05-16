import supertest from 'supertest';
import { app } from '../app';
import { reviews } from '../data/reviews';

describe("GET /reviews", () => {
    it("should return the error message: No auth headers present", async () => {
      const response = await supertest(app).get("/reviews");
      expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })

    it("should returm an object with all the bookings", async () => {
        // Get the token
        const response = await supertest(app).post("/login").send({email: "test@test.com", password: "test"});
        const token = response.body.token;
        // Use the token to make a request to /rooms
        const roomResponse = await supertest(app).get("/reviews").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.body).toEqual(reviews);
    })
})

describe("GET /review/:id", () => {
    it("should return the error message: No auth headers present", async () => {
      const response = await supertest(app).get("/review/25");
      expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })

    const review = {
      orderId: "ORD001",
      date: "2024-04-01",
      customer: "John Doe",
      rating: 5,
      comment: "Excellent hotel with great service and amenities. The staff was very friendly and helpful, and the room was clean and comfortable."
    };

    it("should return an object with the appropiate review", async () => {
        // Get the token
        const response = await supertest(app).post("/login").send({email: "test@test.com", password: "test"});
        const token = response.body.token;
        // Use the token to make a request to /room/:id
        const roomResponse = await supertest(app).get("/review/ord001").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.body).toEqual(review);
    })

    it("should return the error message 'Review not found' when looking for inexistent id", async () => {
        // Get the token
        const response = await supertest(app).post("/login").send({email: "test@test.com", password: "test"});
        const token = response.body.token;
        // Use the token to make a request to /room/:id
        const roomResponse = await supertest(app).get("/review/256").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.status).toEqual(404);
        expect(roomResponse.body).toEqual({error: true, message: "Review not found"});
    })
})