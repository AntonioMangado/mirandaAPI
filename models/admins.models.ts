import mongoose from "mongoose";

const objectSchema = {
    id: Number,
    username: String,
    email: String,
    password: String
}

const adminSchema = new mongoose.Schema(objectSchema);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;