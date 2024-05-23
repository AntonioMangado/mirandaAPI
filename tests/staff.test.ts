import supertest from 'supertest';
import { app } from '../app';
import Staff from '../models/staff.models';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const token = jwt.sign({email: 'admin@admin.com', username: 'admin'}, process.env.CLIENT_SECRET as string, { expiresIn: "1d" });

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/")
})

describe("GET /staff", () => {
    it("should return the error message: No auth headers present", async () => {
      const response = await supertest(app).get("/staff");
      expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })

    it("should returm an object with all the bookings", async () => {
        const staffResponse = await supertest(app).get("/staff").set("Authorization", `Bearer ${token}`);
        expect(staffResponse.status).toBe(200);
        expect(staffResponse.body.data).toBeInstanceOf(Array);
    })
})

describe("GET /staff/:id", () => {
    it("should return the error message: No auth headers present", async () => {
        const response = await supertest(app).get("/staff/25");
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
    
    it("should return an object with the appropiate staff", async () => {
        const staffResponse = await supertest(app).get(`/staff/664ef65cfe6dee2f9bf775f8`).set("Authorization", `Bearer ${token}`);
        expect(staffResponse.body.data._id).toBeDefined();
        expect(staffResponse.body.data._id).toBe('664ef65cfe6dee2f9bf775f8');
        expect(staffResponse.body.data).toBeInstanceOf(Object);
    })
    
    it("should return the error message 'Invalid employee ID' when looking for inexistent id", async () => {
        const staffResponse = await supertest(app).get("/staff/256").set("Authorization", `Bearer ${token}`);
        expect(staffResponse.status).toEqual(400);
        expect(staffResponse.body).toEqual({error: true, message: "Invalid employee ID"});
    })
})

describe('POST /staff', () => {
    const testEmployee = {
        photo: 'employee.webp',
        fullName: 'TEST',
        email: 'john.doe@example.com',
        startDate: '2022-01-15',
        description: 'Software Developer',
        contact: '123-456-7890',
        status: 'ACTIVE'
    }
    it('should return the error message: No auth headers present', async () => {
        const response = await supertest(app).post('/staffs').send(testEmployee);
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
    it('should add the employee to the db', async () => {
        const response = await supertest(app).post('/staff').set("Authorization", `Bearer ${token}`).send(testEmployee);
        expect(response.status).toBe(200);
        expect(response.body.data._id).toBeDefined();
        expect(response.body.data.fullName).toBe(testEmployee.fullName);
    })
})

describe('PATCH /staff', () => {
    const testEmployee = {
        photo: 'employee.webp',
        fullName: 'TEST',
        email: 'john.doe@example.com',
        startDate: '2022-01-15',
        description: 'Software Developer',
        contact: '123-456-7890',
        status: 'ACTIVE'
    }
    const updatedEmployee = {
        photo: 'employee.webp',
        fullName: 'UPDATED_TEST',
        email: 'john.doe@example.com',
        startDate: '2022-01-15',
        description: 'Software Developer',
        contact: '123-456-7890',
        status: 'ACTIVE'
    }
    let employee: any;
    beforeEach(async () => {
        employee = await new Staff(testEmployee).save();
    })
    afterEach(async () => {
        await Staff.findByIdAndDelete(employee._id);
    })
    it('should return the error message: No auth headers present', async () => {
        const response = await supertest(app).patch('/staff').send(testEmployee);
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
    it('should update the employee', async () => {
        const response = await supertest(app).patch(`/staff/${employee._id}`).set("Authorization", `Bearer ${token}`).send(updatedEmployee);
        expect(response.status).toBe(200);
        expect(response.body.data.fullName).toBe(updatedEmployee.fullName);
    })
})

describe('DELETE /staff', () => {
    const testEmployee = {
        photo: 'employee.webp',
        fullName: 'TEST',
        email: 'john.doe@example.com',
        startDate: '2022-01-15',
        description: 'Software Developer',
        contact: '123-456-7890',
        status: 'ACTIVE'
    }
    let employee: any;
    let response: supertest.Response;
    beforeEach(async () => {
        employee = await new Staff(testEmployee).save();
        response = await supertest(app).delete(`/staff/${employee._id}`).set("Authorization", `Bearer ${token}`);
    })
    it('should delete the employee', async () => {
        expect(response.status).toBe(200);
        let deletedEmployee = await Staff.findById(employee._id)
        expect(deletedEmployee).toBeNull();
    })
    it('should return the error message: No auth headers present', async () => {
        const response = await supertest(app).delete('/staff').send(testEmployee);
        expect(response.body).toEqual({ error: true, message: "No auth headers present" });
    })
})

afterAll(async () => {
    await Staff.deleteMany({ 'fullName': 'TEST'})
    await mongoose.disconnect();
})