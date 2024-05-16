import supertest from 'supertest';
import { app } from '../app';
import { staff } from '../data/staff';

describe("GET /staff", () => {
    it("should return the error message: No auth headers present", async () => {
      const response = await supertest(app).get("/staff");
      expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })

    it("should returm an object with all the bookings", async () => {
        // Get the token
        const response = await supertest(app).post("/login").send({email: "test@test.com", password: "test"});
        const token = response.body.token;
        // Use the token to make a request to /rooms
        const roomResponse = await supertest(app).get("/staff").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.body).toEqual({data: staff});
    })
})

describe("GET /staff/:id", () => {
    it("should return the error message: No auth headers present", async () => {
      const response = await supertest(app).get("/staff/25");
      expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })

    const staff = {
      photo: 'employee.webp',
      fullName: 'John Doe',
      employeeId: 'E001',
      email: 'john.doe@example.com',
      startDate: '2022-01-15',
      description: 'Software Developer',
      contact: '123-456-7890',
      status: 'ACTIVE'
    }

    it("should return an object with the appropiate staff member", async () => {
        // Get the token
        const response = await supertest(app).post("/login").send({email: "test@test.com", password: "test"});
        const token = response.body.token;
        // Use the token to make a request to /room/:id
        const roomResponse = await supertest(app).get("/staff/e001").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.body).toEqual(staff);
    })

    it("should return the error message 'Staff member not found' when looking for inexistent id", async () => {
        // Get the token
        const response = await supertest(app).post("/login").send({email: "test@test.com", password: "test"});
        const token = response.body.token;
        // Use the token to make a request to /room/:id
        const roomResponse = await supertest(app).get("/staff/256").set("Authorization", `Bearer ${token}`);
        expect(roomResponse.status).toEqual(404);
        expect(roomResponse.body).toEqual({error: true, message: "Employee not found"});
    })
})
