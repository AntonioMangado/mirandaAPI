import Staff from "../models/staff.models"
import { IStaff } from "../lib/interfaces"
import { APIError } from "../middleware/error"

export async function getStaff(): Promise<IStaff[]> {
    const staff = await Staff.find()
    if (!staff) {
        throw new APIError("Staff not found", 404, true)
    }
    return staff
}

export async function getEmployee(id: string): Promise<IStaff> {
    const employee = await Staff.findOne({employeeId: id.toUpperCase()})
    if (!employee) {
        throw new APIError("Employee not found", 404, true)
    }
    return employee
}