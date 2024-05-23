require('../config/mongodb');
import Admin from '../models/admins.models';
import { app } from '../app';
import supertest from 'supertest';
import mongoose from 'mongoose';
const AccessTokenRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

const admin1 = {
  username: "admin",
  email: 'admin@admin.com',
  password: 'admin'
}
const admin2 = {
  username: "admin2",
  email: 'admin2@admin.com',
  password: 'admin2'
}

beforeEach(async () => {
  await mongoose.connect("mongodb://localhost:27017/")
  await Admin.deleteMany({});
  await new Admin(admin1).save();
})

afterAll(async () => {
  await mongoose.disconnect();
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

    it("should return an access token when credentials are correct", async () => {
        const response = await supertest(app).post("/login").send({email: "admin@admin.com", password: "admin"});
        expect(response.body).toMatch(AccessTokenRegex)
    });
})

describe("POST /admin", () => {
    it('should create an admin in the database with a mongo ID', async () => {
      await new Admin(admin2).save();
      const admin = await Admin.findOne({ email: 'admin2@admin.com'});
      expect(admin).toHaveProperty('_id');
    })

    it("should get admin from db", async () => {
      const admin = await Admin.findOne({ email: 'admin@admin.com'});
      expect(admin?.username).toBe('admin');
    });
})