import supertest from 'supertest';
import { app } from '../app';
import { rooms } from "../data/rooms"
import { error } from 'console';
const AccessTokenRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

describe("GET /rooms", () => {
    it("should return the error message: No auth headers present", async () => {
      const response = await supertest(app).get("/rooms");
      expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })

    it("should returm an object with all the rooms", async () => {
        // Get the token
        const response = await supertest(app).post("/login").send({email: "test@test.com", password: "test"});
        const token = response.body.token;
        // Use the token to make a request to /rooms
        const roomResponse = await supertest(app).get("/rooms").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.body).toEqual(rooms);
    })
})

describe("GET /room/:id", () => {
    it("should return the error message: No auth headers present", async () => {
      const response = await supertest(app).get("/room/25");
      expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })

    const room = {
      image: "hotel-room.webp",
      roomNumber: 101,
      roomID: "R101",
      roomType: "Single Bed",
      amenities: [
          "Wi-Fi",
          "TV",
          "Air Conditioning"
      ],
      price: 100,
      offerPrice: 90,
      status: "available"
    };

    it("should return an object with the appropiate room", async () => {
        // Get the token
        const response = await supertest(app).post("/login").send({email: "test@test.com", password: "test"});
        const token = response.body.token;
        // Use the token to make a request to /room/:id
        const roomResponse = await supertest(app).get("/room/r101").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.body).toEqual(room);
    })

    it("should return the error message 'Room not found' when looking for inexistent id", async () => {
        // Get the token
        const response = await supertest(app).post("/login").send({email: "test@test.com", password: "test"});
        const token = response.body.token;
        // Use the token to make a request to /room/:id
        const roomResponse = await supertest(app).get("/room/2").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.status).toEqual(404);
        expect(roomResponse.body).toEqual({error: true, message: "Room not found"});
    })
})

describe("POST /login", () => {
    it("should return the error message 'Please provide email and password' when no credentials are sent", async () => {
      const response = await supertest(app).post("/login");
      expect(response.body).toEqual({ error: true, message: "Please provide email and password" });
    });

    it("should return the error message 'Please provide email and password' when missing a credential", async () => {
        const response = await supertest(app).post("/login").send({email: "test@test.com"});
        expect(response.body).toEqual({ error: true, message: "Please provide email and password"})
    });

    const sampleLoginResponse = {
      message: "Login successful",
      token: expect.stringMatching(AccessTokenRegex)
    }

    it("should return an access token when credentials are correct", async () => {
        const response = await supertest(app).post("/login").send({email: "test@test.com", password: "test"});
        expect(response.body).toMatchObject(sampleLoginResponse)
    });
})