import supertest from 'supertest';
import { app } from '../app';
import Booking from '../models/bookings.models';
import { IBookingDB } from '../lib/interfaces';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const token = jwt.sign({email: 'admin@admin.com', username: 'admin'}, process.env.CLIENT_SECRET as string, { expiresIn: "1d" });

let dbBookings: IBookingDB[] = [];

beforeEach(async () => {
    await mongoose.connect("mongodb://localhost:27017/")
    dbBookings = await Booking.find({});
})


describe("GET /bookings", () => {
    it("should return the error message: No auth headers present", async () => {
        const response = await supertest(app).get("/bookings");
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
    
    it("should return an object with all the bookings", async () => {
        const roomResponse = await supertest(app).get("/bookings").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.status).toBe(200);
        expect(roomResponse.body.data).toBeInstanceOf(Array);
    })
})

describe("GET /booking/:id", () => {
    it("should return the error message: No auth headers present", async () => {
        const response = await supertest(app).get("/booking/25");
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
    
    it("should return an object with the appropiate booking", async () => {
        const roomResponse = await supertest(app).get(`/booking/664ef847402b75843893ddd6`).set("Authorization", `Bearer ${token}`);
        expect(roomResponse.body.data._id).toBeDefined();
        expect(roomResponse.body.data._id).toBe('664ef847402b75843893ddd6');
        expect(roomResponse.body.data).toBeInstanceOf(Object);
    })
    
    it("should return the error message 'Booking not found' when looking for inexistent id", async () => {
        const roomResponse = await supertest(app).get("/booking/256").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.status).toEqual(400);
        expect(roomResponse.body).toEqual({error: true, message: "Invalid booking ID"});
    })
})

describe('POST /booking', () => {
    const testBooking = {
        guest: {
            name: "TEST",
            surname: "Doe"
          },
        order_date: "2024-04-17",
        check_in: "2024-05-01",
        check_out: "2024-05-05",
        special_request: "Non-smoking room",
        room_type: "Single Bed",
        roomID: 'R101',
        status: "Check In"
    }
    it('should return the error message: No auth headers present', async () => {
        const response = await supertest(app).post('/bookings').send(testBooking);
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
    it('should add the booking to the db', async () => {
        const response = await supertest(app).post('/bookings').set("Authorization", `Bearer ${token}`).send(testBooking);
        expect(response.status).toBe(200);
        expect(response.body.data._id).toBeDefined();
        expect(response.body.data.guest.name).toBe(testBooking.guest.name);
    })
})

describe('PATCH /booking', () => {
    const testBooking = {
        guest: {
            name: "TEST",
            surname: "Doe"
          },
        order_date: "2024-04-17",
        check_in: "2024-05-01",
        check_out: "2024-05-05",
        special_request: "Non-smoking room",
        room_type: "Single Bed",
        roomID: 'R101',
        status: "Check In"
    }
    const updatedBooking = {
        guest: {
            name: "UPDATED",
            surname: "Doe"
          },
        order_date: "2024-04-17",
        check_in: "2024-05-01",
        check_out: "2024-05-05",
        special_request: "UPDATED",
        room_type: "Single Bed",
        roomID: 'R101',
        status: "Check In"
    }
    let booking: any;
    beforeEach(async () => {
        booking = await new Booking(testBooking).save();
    })
    afterEach(async () => {
        await Booking.findByIdAndDelete(booking._id);
    })
    it('should return the error message: No auth headers present', async () => {
        const response = await supertest(app).patch('/bookings').send(testBooking);
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
    it('should update the booking', async () => {
        const response = await supertest(app).patch(`/booking/${booking._id}`).set("Authorization", `Bearer ${token}`).send(updatedBooking);
        expect(response.status).toBe(200);
        expect(response.body.data.guest.name).toBe(updatedBooking.guest.name);
    })
})
describe('DELETE /booking', () => {
    const testBooking = {
        guest: {
            name: "TEST",
            surname: "Doe"
          },
        order_date: "2024-04-17",
        check_in: "2024-05-01",
        check_out: "2024-05-05",
        special_request: "Non-smoking room",
        room_type: "Single Bed",
        roomID: 'R101',
        status: "Check In"
    }
    let booking: any;
    let response: supertest.Response;
    beforeEach(async () => {
        booking = await new Booking(testBooking).save();
        response = await supertest(app).delete(`/booking/${booking._id}`).set("Authorization", `Bearer ${token}`);
    })
    it('should delete the booking', async () => {
        expect(response.status).toBe(200);
        // try to find the booking in the dbw
        let deletedBooking = await Booking.findById(booking._id)
        expect(deletedBooking).toBeNull();
    })
    it('should return the error message: No auth headers present', async () => {
        const response = await supertest(app).delete('/bookings').send(testBooking);
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
})

afterAll(async () => {
    await Booking.deleteMany({ 'guest.name': 'TEST'})
    await mongoose.disconnect();
})