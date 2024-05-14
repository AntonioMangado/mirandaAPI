import { APIError } from "../middleware/error";
import { LoginResponse } from "../lib/interfaces";
import jwt from 'jsonwebtoken';


export async function loginUser(data: {email:string, password:string}): Promise<LoginResponse> {
    const { email, password } = data;
    if (!email || !password) {
        throw new APIError("Please provide email and password", 400, true);
    }

    if (email === "test@test.com" && password === "test") {
        const user = { email, password };
        const token = jwt.sign(user, process.env.CLIENT_SECRET as string, { expiresIn: "30m" });
        return { message: "Login successful", token };
    } else {
        throw new APIError("Invalid email or password", 401, true);
    }
}