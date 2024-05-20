import { Schema, model, connect } from "mongoose";
import { Staff } from "../lib/interfaces"

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

const staffSchema = new Schema<Staff>(objectSchema);

const Staff = model<Staff>("Staff", staffSchema);

export default Staff;