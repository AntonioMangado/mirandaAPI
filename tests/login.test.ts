import supertest from 'supertest';
import { app } from '../app';
const AccessTokenRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

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