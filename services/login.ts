import { APIError } from "../middleware/error";
import Admin from "../models/admins.models";
import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');

interface LoginResponse {
    token: string;
    username: string;
    email: string;
}

export async function loginUser(data: {email:string, password:string}): Promise<LoginResponse> {
    const { email, password } = data;
    if (!email || !password) {
        throw new APIError("Please provide email and password", 400, true);
    }

    const admin = await Admin.findOne({ email });
    if (admin) {
        const hashedPassword = admin.password;
        const match = await bcrypt.compare(password, hashedPassword);
        if (match) {
            const user = { email, username: admin.username };
            const token = jwt.sign(user, process.env.CLIENT_SECRET as string, { expiresIn: "30m" });
            return { token, username: admin.username, email } ;
        } else {
            throw new APIError("Invalid email or password", 401, true);
        }
    } else {
        throw new APIError("Invalid email", 401, true);
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