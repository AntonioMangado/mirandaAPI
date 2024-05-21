import { APIError } from "../middleware/error";
import Admin from "../models/admins.models";
import jwt from 'jsonwebtoken';


export async function loginUser(data: {email:string, password:string}): Promise<string> {
    const { email, password } = data;
    if (!email || !password) {
        throw new APIError("Please provide email and password", 400, true);
    }

    if (email === "test@test.com" && password === "test") {
        const user = { email, password };
        const token = jwt.sign(user, process.env.CLIENT_SECRET as string, { expiresIn: "30m" });
        return token;
    } else {
        throw new APIError("Invalid email or password", 401, true);
    }
}

export async function createAdmin(data: {username: string, email:string, password:string}) {
    const { email, password, username } = data;
    if (!email || !password || !username) {
        throw new APIError("Please provide email, password and username", 400, true);
    }

    const newAdmin = new Admin({ email, password, username });
    return newAdmin.save()
}