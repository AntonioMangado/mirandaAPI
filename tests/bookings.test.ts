import supertest from 'supertest';
import { app } from '../app';
import { bookings } from '../data/bookings';

describe("GET /bookings", () => {
    it("should return the error message: No auth headers present", async () => {
      const response = await supertest(app).get("/bookings");
      expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })

    it("should returm an object with all the bookings", async () => {
        // Get the token
        const response = await supertest(app).post("/login").send({email: "test@test.com", password: "test"});
        const token = response.body.token;
        // Use the token to make a request to /rooms
        const roomResponse = await supertest(app).get("/bookings").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.body).toEqual({data: bookings});
    })
})

describe("GET /booking/:id", () => {
    it("should return the error message: No auth headers present", async () => {
      const response = await supertest(app).get("/booking/25");
      expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })

    const booking = {
      guest: {
          name: "John",
          surname: "Doe"
      },
      booking_id: 1,
      order_date: "2024-04-17",
      check_in: "2024-05-01",
      check_out: "2024-05-05",
      special_request: "Non-smoking room",
      room_type: "Single Bed",
      roomID: 'R101',
      status: "Check In"
  };

    it("should return an object with the appropiate booking", async () => {
        // Get the token
        const response = await supertest(app).post("/login").send({email: "test@test.com", password: "test"});
        const token = response.body.token;
        // Use the token to make a request to /room/:id
        const roomResponse = await supertest(app).get("/booking/1").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.body).toEqual(booking);
    })

    it("should return the error message 'Booking not found' when looking for inexistent id", async () => {
        // Get the token
        const response = await supertest(app).post("/login").send({email: "test@test.com", password: "test"});
        const token = response.body.token;
        // Use the token to make a request to /room/:id
        const roomResponse = await supertest(app).get("/booking/256").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.status).toEqual(404);
        expect(roomResponse.body).toEqual({error: true, message: "Booking not found"});
    })
})