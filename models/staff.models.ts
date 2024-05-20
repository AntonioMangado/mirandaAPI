import mongoose from "mongoose";

const objectSchema = {
    photo: String,
    fullName: String,
    employeeId: String,
    email: String,
    startDate: String,
    description: String,
    contact: String,
    status: String
}

const staffSchema = new mongoose.Schema(objectSchema);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;