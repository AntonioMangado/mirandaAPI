import supertest from 'supertest';
import { app } from '../app';
import Room from '../models/rooms.models';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const token = jwt.sign({email: 'admin@admin.com', username: 'admin'}, process.env.CLIENT_SECRET as string, { expiresIn: "1d" });

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/")
})

describe("GET /rooms", () => {
    it("should return the error message: No auth headers present", async () => {
      const response = await supertest(app).get("/rooms");
      expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })

    it("should returm an object with all the rooms", async () => {
        const roomResponse = await supertest(app).get("/rooms").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.status).toBe(200);
        expect(roomResponse.body.data).toBeInstanceOf(Array);
    })
})

describe("GET /room/:id", () => {
    it("should return the error message: No auth headers present", async () => {
      const response = await supertest(app).get("/room/25");
      expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })

    it("should return an object with the appropiate room", async () => {
        const roomResponse = await supertest(app).get("/room/664ef65cfe6dee2f9bf775e2").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.body.data._id).toBeDefined();
        expect(roomResponse.body.data._id).toBe('664ef65cfe6dee2f9bf775e2');
        expect(roomResponse.body.data).toBeInstanceOf(Object);
    })

    it("should return the error message 'Room not found' when looking for inexistent id", async () => {
        const roomResponse = await supertest(app).get("/room/256").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.status).toEqual(400);
        expect(roomResponse.body).toEqual({error: true, message: "Invalid room ID"});
    })
})

describe('POST /room', () => {
    const testRoom = {
        image: 'hotel-room.webp',
        roomNumber: 101,
        roomType: 'TEST',
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning'],
        price: 100,
        offerPrice: 90,
        status: 'available',
    }
    it('should return the error message: No auth headers present', async () => {
        const response = await supertest(app).post('/rooms').send(testRoom);
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
    it('should add the room to the db', async () => {
        const response = await supertest(app).post('/rooms').set("Authorization", `Bearer ${token}`).send(testRoom);
        expect(response.status).toBe(200);
        expect(response.body.data._id).toBeDefined();
        expect(response.body.data.roomType).toBe(testRoom.roomType);
    })
})

describe('PATCH /room', () => {
    const testRoom = {
        image: 'hotel-room.webp',
        roomNumber: 101,
        roomType: 'TEST',
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning'],
        price: 100,
        offerPrice: 90,
        status: 'available',
    }
    const updatedRoom = {
        image: 'hotel-room.webp',
        roomNumber: 101,
        roomType: 'UPDATED_TEST',
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning'],
        price: 100,
        offerPrice: 90,
        status: 'available',
    }
    let room: any;
    beforeEach(async () => {
        room = await new Room(testRoom).save();
    })
    afterEach(async () => {
        await Room.findByIdAndDelete(room._id);
    })
    it('should return the error message: No auth headers present', async () => {
        const response = await supertest(app).patch('/rooms').send(testRoom);
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
    it('should update the room', async () => {
        const response = await supertest(app).patch(`/room/${room._id}`).set("Authorization", `Bearer ${token}`).send(updatedRoom);
        expect(response.status).toBe(200);
        expect(response.body.data.roomType).toBe(updatedRoom.roomType);
    })
})

describe('DELETE /room', () => {
    const testRoom = {
        image: 'hotel-room.webp',
        roomNumber: 101,
        roomType: 'TEST',
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning'],
        price: 100,
        offerPrice: 90,
        status: 'available',
    }
    let room: any;
    let response: supertest.Response;
    beforeEach(async () => {
        room = await new Room(testRoom).save();
        response = await supertest(app).delete(`/room/${room._id}`).set("Authorization", `Bearer ${token}`);
    })
    it('should delete the room', async () => {
        expect(response.status).toBe(200);
        let deletedRoom = await Room.findById(room._id)
        expect(deletedRoom).toBeNull();
    })
    it('should return the error message: No auth headers present', async () => {
        const response = await supertest(app).delete('/rooms').send(testRoom);
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
})

afterAll(async () => {
    await Room.deleteMany({ 'roomID': 'TEST'})
    await mongoose.disconnect();
})






