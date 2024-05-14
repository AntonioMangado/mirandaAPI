import { staff } from "../data/staff"
import { Staff } from "../lib/interfaces"
import { APIError } from "../middleware/error"

export async function getStaff(): Promise<Staff[]> {
    if (!staff) {
        throw new APIError("Staff not found", 404, true)
    }
    return staff
}

export async function getEmployee(id: string): Promise<Staff> {
    const employee = staff.find(employee => (employee.employeeId).toLowerCase() === id)
    if (!employee) {
        throw new APIError("Employee not found", 404, true)
    }
    return employee
}