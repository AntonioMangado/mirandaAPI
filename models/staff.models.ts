import { Schema, model, connect, disconnect, HydratedDocument } from "mongoose";
import { IStaff } from "../lib/interfaces"

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

const staffSchema = new Schema<IStaff>(objectSchema);

const Staff = model<IStaff>("Staff", staffSchema);

export default Staff;

// async function run() {
//     await connect("mongodb://localhost:27017")
//     const testStaff1: HydratedDocument<IStaff> = new Staff({
//         photo: 'employee.webp',
//         fullName: 'John Doe',
//         employeeId: 'E001',
//         email: 'john.doe@example.com',
//         startDate: '2022-01-15',
//         description: 'Software Developer',
//         contact: '123-456-7890',
//         status: 'ACTIVE'
//     })
//     const testStaff2: HydratedDocument<IStaff> = new Staff({
//         photo: 'employee.webp',
//         fullName: 'John Doe',
//         employeeId: 'E002',
//         email: 'john.doe@example.com',
//         startDate: '2022-01-15',
//         description: 'Software Developer',
//         contact: '123-456-7890',
//         status: 'ACTIVE'
//     })
//     const testStaff3: HydratedDocument<IStaff> = new Staff({
//         photo: 'employee.webp',
//         fullName: 'John Doe',
//         employeeId: 'E003',
//         email: 'john.doe@example.com',
//         startDate: '2022-01-15',
//         description: 'Software Developer',
//         contact: '123-456-7890',
//         status: 'ACTIVE'
//     })
//     const staffArray = [testStaff1, testStaff2, testStaff3];
//     await Staff.insertMany(staffArray);
//     console.log("Staff saved");
//     disconnect();
// }

// run().catch(err => console.error(err))